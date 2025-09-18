// src/api/products-api.ts
import { BaseApi } from "./base-api";
import { APIRequestContext, expect } from "@playwright/test";
import { ApiEndpoints } from "@data/api-endpoints";

export class ProductsApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }

  async getAllProducts() {
    const response = await this.get(ApiEndpoints.PRODUCTS.LIST);
    return response;
  }

  async postProduct() {
    const response = await this.post(ApiEndpoints.PRODUCTS.LIST, {
      data: {},
    });
    return response;
  }

  async searchProduct(searchTerm?: string) {
    if (searchTerm === undefined) {
      const response = await this.postForm(ApiEndpoints.PRODUCTS.SEARCH, {});

      return response;
    }
    const response = await this.postForm(ApiEndpoints.PRODUCTS.SEARCH, {
      search_product: searchTerm,
    });
    return response;
  }
}
