import { BaseApi } from "./base-api";
import { APIRequestContext, expect } from "@playwright/test";
import { ApiEndpoints } from "@data/api-endpoints";

export class LoginApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }

  async verifyLogin(email: string, password: string) {
    const response = await this.postForm(ApiEndpoints.LOGIN.VERIFY, {
      email,
      password,
    });
    return response;
  }

  async verifyLoginNoEmail(password: string) {
    const response = await this.postForm(ApiEndpoints.LOGIN.VERIFY, {
      password,
    });
    return response;
  }

  async deleteLogin() {
    const response = await this.delete(ApiEndpoints.LOGIN.VERIFY);
    return response;
  }
}
