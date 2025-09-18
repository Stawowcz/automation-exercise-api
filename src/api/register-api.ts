import { BaseApi } from "./base-api";
import { APIRequestContext } from "@playwright/test";
import { ApiEndpoints } from "@constants/endpoints/api-endpoints";

export class RegisterApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }
  async registerUser(params: Record<string, string>) {
    return this.postForm(ApiEndpoints.USERS.CREATE, params);
  }

  async updateUser(params: Record<string, string>) {
    return this.putForm(ApiEndpoints.USERS.UPDATE, params);
  }

  async deleteUser(email: string, password: string) {
    return this.delete(ApiEndpoints.USERS.DELETE, {
      email,
      password,
    });
  }

  async getUserDetailByEmail(email: string) {
    return this.get(ApiEndpoints.USERS.DETAILS, { email });
  }
}
