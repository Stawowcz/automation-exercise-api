import { BaseApi } from "./base-api";
import { APIRequestContext, expect } from "@playwright/test";
import { ApiEndpoints } from "../data/api-endpoints";

export class BrandsApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }

  async getAllBrands() {
    const response = await this.get(ApiEndpoints.BRANDS.LIST);
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async postBrand() {
    const response = await this.post(ApiEndpoints.BRANDS.LIST, { data: {} });
    expect(response.ok()).toBeTruthy();
    return response;
  }
}
