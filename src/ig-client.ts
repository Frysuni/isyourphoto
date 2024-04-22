import { IgApiClient, IgResponseError } from "instagram-private-api";
import { readFile, writeFile } from "node:fs/promises";
import { COOKIES_FILE_PATH } from "./constants";
import envConfig from "./env-config";
import { handleError } from "./handle-error";

export class IgClient {
  private readonly ig = new IgApiClient;

  constructor() {}

  public async getUserFeed() {
    if (!await this.checkLogin()) return false;

    const user = await this.ig.user.searchExact(envConfig.ig.target).catch(handleError.bind('SEARCH'));
    if (!user) return false;

    const feed = this.ig.feed.user(user.pk);
    return feed;
  }

  private async checkLogin() {
    const logined = await this.ig.account.currentUser()
      .then(() => true)
      .catch(() => false);

    if (logined) {
      this.saveCookie();
      return true;
    }

    return await this.login().catch(handleError.bind('LOGIN'));
  }

  private async saveCookie() {
    const cookies = await this.ig.state.serializeCookieJar();
    writeFile(COOKIES_FILE_PATH, JSON.stringify(cookies, undefined, 2));
  }

  private async login() {
    await this.ig.account.logout();

    try {
      const cookies = await readFile(COOKIES_FILE_PATH, 'utf-8').catch<false>(() => false);
      if (cookies) await this.ig.state.deserializeCookieJar(cookies);
      await this.ig.account.currentUser();
    } catch (error: unknown) {

      if (
        !(error instanceof IgResponseError) ||
        error.response.statusCode !== 403
      ) throw error;

      this.ig.state.generateDevice(envConfig.ig.login);

      // await this.ig.simulate.preLoginFlow();
      await this.ig.account.login(envConfig.ig.login, envConfig.ig.password);
      // process.nextTick(async () => await this.ig.simulate.postLoginFlow());

      await this.ig.account.currentUser();

      setTimeout(() => this.saveCookie(), 10_000);
    }

    return true;
  }
}
