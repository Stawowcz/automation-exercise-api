import { BaseApi } from "./base-api";
import { APIRequestContext, expect } from "@playwright/test";
import { ApiEndpoints } from "@data/api-endpoints";

export class RegisterApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }
  async registerUser(params: Record<string, string>) {
    const response = await this.postForm(ApiEndpoints.USERS.CREATE, params);
    return response;
  }

  async updateUser(params: Record<string, string>) {
    const response = await this.putForm(ApiEndpoints.USERS.UPDATE, params);
    return response;
  }

  async deleteUser(email: string, password: string) {
    const response = await this.delete(ApiEndpoints.USERS.DELETE, {
      email,
      password,
    });
    return response;
  }

  async getUserDetailByEmail(email: string) {
    const response = await this.get(ApiEndpoints.USERS.DETAILS, { email });
    return response;
  }
}
