import { GetObjectCommand, ListObjectsCommand, NoSuchKey, ObjectStorageClass, S3Client } from "@aws-sdk/client-s3";
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from "stream";
import envConfig from "./env-config";
import { handleError } from "./handle-error";

export class S3 {
  private readonly bucket = envConfig.s3.bucket;
  private readonly s3Client = new S3Client({
    serviceId: 's3',
    endpoint: envConfig.s3.endpointUrl.href,
    region: envConfig.s3.defaultRegion,
    credentials: {
      accessKeyId: envConfig.s3.accessKeyId,
      secretAccessKey: envConfig.s3.secretAccessKey,
    },
  });

  public upload(key: string, data: Readable | string) {
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: envConfig.s3.bucket,
        ACL: 'public-read',
        Key: key,
        Body: data,
      },
    });

    return upload.done().catch(handleError.bind('S3_UPLOAD'));
  }

  public async list(keyOnly = true) {
    const command = new ListObjectsCommand({
      Bucket: this.bucket,
      MaxKeys: 10_000,
    });

    const res = await this.s3Client.send(command).catch(handleError.bind('S3_LIST'));
    if (!res) return false;

    if (keyOnly) return res.Contents!.map(content => content.Key!);

    return res.Contents!.map(content => ({
      key: content.Key!,
      lastModified: content.LastModified!,
      eTag: content.ETag!,
      size: content.Size!,
      storageClass: content.StorageClass as typeof ObjectStorageClass.STANDARD | typeof ObjectStorageClass.STANDARD_IA,
      owner: content.Owner as Required<NonNullable<typeof content.Owner>>,
    }));
  }

  public get(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return this.s3Client.send(command)
      .then(d => d.Body!.transformToString('utf-8'))
      .catch(e => e instanceof NoSuchKey ? null : (() => { throw e; })())
      .catch(handleError.bind('S3_GET'));
  }
}
