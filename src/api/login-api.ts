import { BaseApi } from "./base-api";
import { APIRequestContext, expect } from "@playwright/test";
import { ApiEndpoints } from "@constants/endpoints/api-endpoints";

export class LoginApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }

  async verifyLogin(email: string, password: string) {
    const response = await this.postForm(ApiEndpoints.LOGIN.VERIFY, {
      email,
      password,
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async verifyLoginNoEmail(password: string) {
    const response = await this.postForm(ApiEndpoints.LOGIN.VERIFY, {
      password,
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async deleteLogin() {
    const response = await this.delete(ApiEndpoints.LOGIN.VERIFY);
    expect(response.ok()).toBeTruthy();
    return response;
  }
}
