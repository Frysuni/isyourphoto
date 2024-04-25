import { randomUUID } from "crypto";
import { createReadStream, readdirSync } from "fs";
import { MANIFEST_FILE } from "./constants";
import { CollectionMetadata } from "./metadata.interface";
import { S3 } from "./s3";

const s3 = new S3();

void async function() {
  await s3.purge();
  const metadata: CollectionMetadata[] = [];
  const cats = readdirSync('./fuck');
  for (const cat of cats) {
    const images: string[] = [];
    const dogs = readdirSync(`./fuck/${cat}`);
    for (const dog of dogs) {
      const name = randomUUID() + '.' + dog.split('.').at(-1);
      const res = await s3.upload(name, createReadStream(`./fuck/${cat}/${dog}`));
      images.push(name);
    }
    function randomDate(start: Date, end: Date) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    const startDate = new Date('2022-01-01T00:00:00Z');
    const endDate = new Date('2024-12-31T23:59:59Z');

    metadata.push({
      caption: cat,
      code: randomUUID(),
      date: randomDate(startDate, endDate).toLocaleDateString('ru-RU', { dateStyle: 'long' }),
      images,
    });
  }

  await s3.upload(MANIFEST_FILE, JSON.stringify(metadata, undefined, 2));
}();