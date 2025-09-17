import { BaseApi } from "./base-api";
import { APIRequestContext } from "@playwright/test";
import { ApiEndpoints } from "../constants/endpoints/api-endpoints";

export class LoginApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }

  async verifyLogin(email: string, password: string) {
    return this.postForm(ApiEndpoints.LOGIN.VERIFY, {
      email,
      password,
    });
  }

  async verifyLoginNoEmail(password: string) {
    return this.postForm(ApiEndpoints.LOGIN.VERIFY, {
      password,
    });
  }

  async deleteLogin() {
    return this.delete(ApiEndpoints.LOGIN.VERIFY);
  }
}
