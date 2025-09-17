import { BaseApi } from "./base-api";
import { APIRequestContext } from "@playwright/test";
import { ApiEndpoints } from "../constants/api-endpoints";

export class LoginApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }

  async verifyLogin(email: string, password: string) {
    return this.postUrlEncoded2(ApiEndpoints.LOGIN.VERIFY, {
      email,
      password,
    });
  }

  async verifyLoginNoEmail(password: string) {
    return this.postUrlEncoded2(ApiEndpoints.LOGIN.VERIFY, {
      password,
    });
  }

  async deleteLogin() {
    return this.deleteUrlEncoded2(ApiEndpoints.LOGIN.VERIFY);
  }
}
