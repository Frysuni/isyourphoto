import { config } from 'dotenv';
import { from } from 'env-var';

config();
const env = from(process.env);

export const envConfig = {
  ig: {
    login: env.get('IG_LOGIN').required().asString(),
    password: env.get('IG_PASSWORD').required().asString(),
    target: env.get('IG_TARGET').required().asString(),
  },
  s3: {
    bucket: env.get('S3_BUCKET').required().asString(),
    endpointUrl: env.get('S3_ENDPOINT-URL').default('https://hb.vkcs.cloud').asUrlObject(),
    accessKeyId: env.get('S3_ACCESS-KEY-ID').required().asString(),
    secretAccessKey: env.get('S3_SECRET-ACCESS-KEY').required().asString(),
    defaultRegion: env.get('S3_DEFAULT-REGION').default('ru-msk').asString(),
  },
};
export default envConfig;
