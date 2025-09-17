import { BaseApi } from "./base-api";
import { APIRequestContext } from "@playwright/test";
import { ApiEndpoints } from "../constants/api-endpoints";

export class RegisterApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }
  async registerUser(params: Record<string, string>) {
    return this.postUrlEncoded2(ApiEndpoints.USERS.CREATE, params);
  }

  async updateUser(params: Record<string, string>) {
    return this.putUrlEncoded2(ApiEndpoints.USERS.UPDATE, params);
  }

  async deleteUser(email: string, password: string) {
    return this.deleteUserUrlEncoded2(ApiEndpoints.USERS.DELETE, {
      email,
      password,
    });
  }

  async getUserDetailByEmail(email: string) {
    return this.getWithParams(ApiEndpoints.USERS.DETAILS, { email });
  }
}
