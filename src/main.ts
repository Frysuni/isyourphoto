import axios from 'axios';
import { appendFileSync, createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'fs';
import { createServer } from 'http';
import { IgApiClient, UserFeedResponseItemsItem } from 'instagram-private-api';
import { resolve } from 'node:path';
import { Readable } from 'stream';
import envConfig from './env-config';

const cookiesFile = resolve(process.cwd(), 'cookies.json');
const errorsFile = resolve(process.cwd(), 'errors.txt');
const storageDir = resolve(process.cwd(), 'storage');
if (!existsSync(storageDir)) mkdirSync(storageDir);

void function() {
  if (envConfig.server !== 0 && envConfig.server) serve();
  scan();
  setInterval(scan, 1.5 * 60 * 60 * 1000);

}();

async function serve() {
  const server = createServer((request, response) => {
    const url = new URL(request.url ?? '/', `http://${request.headers.host}`);
    const file = resolve(storageDir, url.pathname.startsWith('/') ? url.pathname.replace('/', '') : url.pathname);

    if (!existsSync(file) || !statSync(file).isFile() || !file.includes(storageDir)) {
      response.statusCode = 404;
      response.statusMessage = 'Not found.';
      response.end();
      return;
    }

    response.statusCode = 200;
    const readStream = createReadStream(file);
    readStream.pipe(response);
  });

  server.listen(envConfig.server);
}

process.on('uncaughtException', handleError.bind('UncaughtException'));
process.on('unhandledRejection', handleError.bind('UnhandledRejection'));

async function scan() {
  process.stdout.write('SCAN Started.\n');
  const startTime = Date.now();

  const ig = await login().catch(handleError.bind('LOGIN'));
  if (!ig) return;

  const user = await ig.user.searchExact(envConfig.igTarget).catch(handleError.bind('SEARCH'));
  if (!user) return;

  const userFeed = ig.feed.user(user.pk);

  const metadata: {
    code: string,
    caption: string,
    date: string,
    images: string[],
  }[] = [];
  const save = (code: string, caption: string, date: string, images: string[]) => metadata.push({ code, caption, date, images });

  do {
    const items = await userFeed.items().catch(handleError.bind('ITMES'));
    if (!items) return false;

    for (const item of items) {
      const collection = parseCollection(item);
      if (!collection) continue;

      const collectionDir = resolve(storageDir, item.code);
      const serializeImagePath = (imagePath: string) => imagePath.replace(storageDir, '').replaceAll('\\', '/');

      if (existsSync(collectionDir)) {
        const imagesInDir = readdirSync(resolve(collectionDir));
        const serialized = imagesInDir.map(imageName => serializeImagePath(resolve(collectionDir, imageName)));
        save(collection.code, collection.caption, collection.date, serialized);
        continue;
      };
      mkdirSync(collectionDir);

      const images: string[] = [];

      for (const image of collection?.images) {
        const imagePath = resolve(collectionDir, image.id + '.webp');

        const result = await downloadImage(image.url, imagePath)
          .catch(handleError.bind('DOWNLOAD'));

        if (!result) {
          if (existsSync(imagePath)) rmSync(imagePath);
          continue;
        };

        images.push(serializeImagePath(imagePath));
      }

      save(
        collection.code,
        collection.caption,
        collection.date,
        images,
      );
    }

  } while (userFeed.isMoreAvailable());

  writeFileSync(resolve(storageDir, 'manifest.json'), JSON.stringify(metadata));

  const time = ~~((Date.now() - startTime) / 1000);
  process.stdout.write(`SCAN Ended in ${time} seconds.\n\n`);
}

async function downloadImage(url: string, path: string) {
  const request = await axios<Readable>({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  const writeStream = createWriteStream(path);
  request.data.pipe(writeStream);
  await new Promise(res => setInterval(res, 200));
  return true;
}

function parseCollection(item: UserFeedResponseItemsItem) {
  if (item.media_type !== 8) return false;

  const caption = item.caption?.text.split('\n')[0] ?? 'IsYourPhoto';
  const date = new Date(item.taken_at * 1000).toLocaleDateString();

  const images = item.carousel_media!.map(media => {
    const url = media.image_versions2.candidates.sort((a, b) => a.height * a.width + b.height * b.width)[0].url;
    return {
      id: media.id,
      url,
    };
  });

  return {
    caption,
    date,
    images,
    code: item.code,
  };
}

async function login() {
  const ig = new IgApiClient();
  ig.state.generateDevice(envConfig.igLogin);
  if (envConfig.proxy) ig.state.proxyUrl = envConfig.proxy;

  try {
    if (existsSync(cookiesFile)) {
      const savedCookies = readFileSync(cookiesFile, "utf8");
      await ig.state.deserializeCookieJar(savedCookies);
    }

    await ig.account.currentUser();

  } catch (error: unknown) {
    if (
      error instanceof Error &&
      'response' in error &&
      error.response &&
      (error.response as any)?.statusCode &&
      (error.response as any)?.statusCode === 403
    ) {
      await ig.simulate.preLoginFlow();
      await ig.account.login(envConfig.igLogin, envConfig.igPassword);
      // process.nextTick(async () => await ig.simulate.postLoginFlow());
      process.nextTick(async () => {
        const cookies = await ig.state.serializeCookieJar();
        writeFileSync(cookiesFile, JSON.stringify(cookies, undefined, 2));
      });
    } else {
      throw error;
    }
  }
  process.stdout.write('Logged in.\n');

  return ig;
}

function handleError(this: string, error: unknown): false {
  const date = new Date();
  const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  let errorName = 'UnknownError';
  let errorMessage = 'No message.';

  if (error instanceof Error) {
    errorName = error.name;
    errorMessage = error.message;
  }

  const message = `${dateString} - [${this}] ${errorName}: ${errorMessage}`;
  process.stdout.write(message);

  if (!existsSync(errorsFile)) writeFileSync(errorsFile, '');
  appendFileSync(errorsFile, message + '\n');

  return false;
}