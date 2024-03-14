import { ListObjectsCommand, NoSuchKey, S3Client } from "@aws-sdk/client-s3";
import envConfig from "./env-config";
import { handleError } from "./handle-error";


const s3 = new S3Client({
  serviceId: 's3',
  endpoint: envConfig.s3.endpointUrl.href,
  region: envConfig.s3.defaultRegion,
  credentials: {
    accessKeyId: envConfig.s3.accessKeyId,
    secretAccessKey: envConfig.s3.secretAccessKey,
  },

});
void async function() {
  const command = new ListObjectsCommand({
    Bucket: 'isyourphoto',
  });
  const res = await s3.send(command).catch(e => e instanceof NoSuchKey ? null : (() => { throw e; })())
  .catch(handleError.bind('S3_GET'));
  console.log((res as any).Contents.filter((a: any) => !a.Key.endsWith('webp')));


}();
// const a = readdirSync('storage/data', { recursive: true, withFileTypes: true }).filter(b => b.isFile()).map(b => b.name);
// console.log(a.length === new Set(a).size);