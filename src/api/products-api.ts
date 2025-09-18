// src/api/products-api.ts
import { BaseApi } from "./base-api";
import { APIRequestContext, expect } from "@playwright/test";
import { ApiEndpoints } from "@constants/endpoints/api-endpoints";

export class ProductsApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }

  async getAllProducts() {
    const response = await this.get(ApiEndpoints.PRODUCTS.LIST);
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async postProduct() {
    const response = await this.post(ApiEndpoints.PRODUCTS.LIST, {
      data: {},
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async searchProduct(searchTerm?: string) {
    if (searchTerm === undefined) {
      const response = await this.postForm(ApiEndpoints.PRODUCTS.SEARCH, {});
      expect(response.ok()).toBeTruthy();
      return response;
    }
    const response = await this.postForm(ApiEndpoints.PRODUCTS.SEARCH, {
      search_product: searchTerm,
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }
}
