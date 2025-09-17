import { BaseApi } from "./base-api";
import { APIRequestContext } from "@playwright/test";
import { ApiEndpoints } from "../constants/endpoints/api-endpoints";

export class BrandsApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }

  async getAllBrands() {
    return this.get(ApiEndpoints.BRANDS.LIST);
  }

  async postBrand() {
    return this.post(ApiEndpoints.BRANDS.LIST, { data: {} });
  }
}
