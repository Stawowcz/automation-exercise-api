// tests/api/products.spec.ts
import { test, expect } from "@playwright/test";
import { ProductsApi } from "../src/api/products-api";
import { CommonConstants } from "../src/constants/common/common-constants";
import {
  REQUIRED_PRODUCT_FIELDS,
} from "../src/constants/product/product-fields";
import {
  REQUIRED_CATEGORY_FIELDS,
} from "../src/constants/category/category-fields";
import { ProductsResponse } from "../src/types/api-types";
import { CommonData } from "../src/data/common-data";

test.describe("Products API", () => {
  test("should return all products list", async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response = await productsApi.getAllProducts();

    expect(response.status()).toBe(200);

    const body: ProductsResponse = await response.json();
    expect(body).toHaveProperty("products");
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBe(34);
    expect(response.headers()["content-type"]).toContain(
      "text/html; charset=utf-8",
    );

    for (const product of body.products) {
      expect(product).toHaveProperty(REQUIRED_PRODUCT_FIELDS.ID);
      expect(product).toHaveProperty(REQUIRED_PRODUCT_FIELDS.NAME);
      expect(product).toHaveProperty(REQUIRED_PRODUCT_FIELDS.PRICE);
      expect(product).toHaveProperty(REQUIRED_PRODUCT_FIELDS.BRAND);
      expect(product).toHaveProperty(REQUIRED_PRODUCT_FIELDS.CATEGORY);

      expect(product.category).toHaveProperty(
        REQUIRED_CATEGORY_FIELDS.CATEGORY,
      );
      expect(product.category).toHaveProperty(
        REQUIRED_CATEGORY_FIELDS.USERTYPE,
      );
    }
  });

  test("should not create product", async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response = await productsApi.postProduct();

    expect(response.status()).toBe(200);

    const body: ProductsResponse = await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe(
      CommonConstants.ERROR_MESSAGE_METHOD_NOT_SUPPORTED,
    );
  });

  test("should return searched products by name", async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response = await productsApi.searchProduct(
      CommonData.SEARCH_EXAMPLE_NAME,
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBe(1);
    expect(body.products[0].id).toBe(1);
    expect(body.products[0].name).toBe(CommonData.SEARCH_EXAMPLE_NAME);
    expect(body.products[0].brand).toBe(CommonConstants.SEARCH_EXAMPLE_BRAND);
    expect(body.products[0].category).toBeDefined();
  });
});
