import { config } from 'dotenv';
import { from } from 'env-var';

config();
const env = from(process.env);

export const envConfig = {
  igLogin: env.get('IG-LOGIN').required().asString(),
  igPassword: env.get('IG-PASSWORD').required().asString(),
  igTarget: env.get('IG-TARGET').required().asString(),
  proxy: env.get('PROXY').asString(),
  server: env.get('SERVER_PORT').default('0').asPortNumber(),
};
export default envConfig;
