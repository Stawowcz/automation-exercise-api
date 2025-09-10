// src/api/products-api.ts
import { BaseApi } from "./base-api";
import { APIRequestContext } from "@playwright/test";
import { ApiEndpoints } from "../constants/api-endpoints";

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

  async searchProduct(searchTerm: string) {
    return this.postUrlEncoded(ApiEndpoints.PRODUCTS.SEARCH, {
      search_product: searchTerm,
    });
  }
}
