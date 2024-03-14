import axios from 'axios';
import { UserFeedResponseItemsItem } from 'instagram-private-api';
import { Readable } from 'stream';
import { MANIFEST_FILE } from './constants';
import { extractImages } from './extract-images';
import { handleError } from './handle-error';
import { IgClient } from './ig-client';
import { CollectionMetadata } from './metadata.interface';
import { S3 } from './s3';

const igClient = new IgClient;
const s3 = new S3();

process.on('uncaughtException', handleError.bind('UncaughtException'));
process.on('unhandledRejection', handleError.bind('UnhandledRejection'));

let scanIteration = 0;

void async function boot() {
  await scan();
  setTimeout(() => boot(), 10 * 60 * 60 * 1000);
}();

async function scan() {
  scanIteration++;
  const startTime = Date.now();

  /**
   * получаем страницу
   */
  const feed = await igClient.getUserFeed();
  if (!feed) return;


  /**
   * получаем все публикации
   */
  const allFeedItems: UserFeedResponseItemsItem[] = [];

  do {
    const feedItems = await feed.items();
    if (!feedItems) return false;
    allFeedItems.push(...feedItems);
  } while (feed.isMoreAvailable());

  let oldManifest: CollectionMetadata[] = [];
  const rawOldManifest = await s3.get(MANIFEST_FILE);
  if (rawOldManifest === false) return;

  if (rawOldManifest !== null) {
    oldManifest = JSON.parse(rawOldManifest);
    const oldFiles = await s3.list(true);
    if (!oldFiles) return;

    const feedCount = allFeedItems.filter(item => item.media_type !== 8).length;
    const oldManifestCount = oldManifest.length;
    const oldFilesCount = oldFiles.filter((file) => file !== MANIFEST_FILE).length;

    /**
     *  начинаем скан только если есть что-то несовпадает
     *  но каждая 10я итерация обязательна
     */
    // если это не 10й раз И одно такое же И второе такое же
    if (
      scanIteration % 10 !== 0 &&
      feedCount === oldManifestCount &&
      feedCount === oldFilesCount
    ) return;
  }

  const manifest: CollectionMetadata[] = [];

  feedCycle:for (const feedItem of allFeedItems) {
    if (feedItem.media_type !== 8) continue; // вроде это коллекция картинок, пока работает

    const existItem = oldManifest.find(metadata => metadata.code === feedItem.code);
    if (existItem) {
      manifest.push(existItem);
      continue;
    }

    const images = extractImages(feedItem);

    const collectionMetadata: CollectionMetadata = {
      code: feedItem.code,
      caption: feedItem.caption?.text.split('\n')[0] ?? ' ',
      date: new Date(feedItem.taken_at * 1000).toDateString(),
      images: images.map(image => image.filename),
    };


    for (const image of images) {
      const response = await axios.get<Readable>(image.url, { responseType: 'stream' })
        .catch(handleError.bind('DOWNLOAD'));
      if (!response) continue feedCycle;

      const res = await s3.upload(image.filename, response.data).catch(handleError.bind('UPLOAD'));
      if (!res) continue feedCycle;
    }

    manifest.push(collectionMetadata);
  }


  const res = await s3.upload(MANIFEST_FILE, JSON.stringify(manifest, undefined, 2));
  if (!res) return handleError.call('S3_UPLOAD', { name: 'THAT WAS', message: 'MANIFEEEEST!!!' });

  const time = ~~((Date.now() - startTime) / 1000);
  process.stdout.write(`SCAN Finished in ${time} seconds.\n\n`);
}
