// src/api/products-api.ts
import { BaseApi } from "./base-api";
import { APIRequestContext } from "@playwright/test";
import { ApiEndpoints } from "@constants/endpoints/api-endpoints";

export class ProductsApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request, ApiEndpoints.BASE_URL);
  }

  async getAllProducts() {
    return this.get(ApiEndpoints.PRODUCTS.LIST);
  }

  async postProduct() {
    return this.post(ApiEndpoints.PRODUCTS.LIST, {
      data: {},
    });
  }

  async searchProduct(searchTerm?: string) {
    if (searchTerm === undefined) {
      return this.postForm(ApiEndpoints.PRODUCTS.SEARCH, {});
    }
    return this.postForm(ApiEndpoints.PRODUCTS.SEARCH, {
      search_product: searchTerm,
    });
  }
}
