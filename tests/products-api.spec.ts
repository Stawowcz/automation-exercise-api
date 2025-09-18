import { test, expect } from "@playwright/test";
import { ProductsApi } from "@api/products-api";
import { CommonConstants } from "@constants/common/common-fields";
import { REQUIRED_PRODUCT_FIELDS } from "@constants/product/product-fields";
import { REQUIRED_CATEGORY_FIELDS } from "@constants/category/category-fields";
import { ProductsResponse } from "@typings/api-types";
import { CommonData } from "@data/common-data";
import { REQUIRED_BRAND_FIELDS } from "@constants/brand";
import { REQUIRED_AUTH_FIELDS } from "@constants/auth/auth-fields";

test.describe("Products API", () => {
  test("should return all products list", async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response = await productsApi.getAllProducts();

    expect.soft(response.status()).toBe(200);

    const body: ProductsResponse = await response.json();
    expect.soft(body).toHaveProperty("products");
    expect.soft(Array.isArray(body.products)).toBeTruthy();
    expect.soft(body.products.length).toBe(34);
    expect
      .soft(response.headers()["content-type"])
      .toContain("text/html; charset=utf-8");

    for (const product of body.products) {
      expect.soft(product).toHaveProperty(REQUIRED_PRODUCT_FIELDS.ID);
      expect.soft(product).toHaveProperty(REQUIRED_PRODUCT_FIELDS.NAME);
      expect.soft(product).toHaveProperty(REQUIRED_PRODUCT_FIELDS.PRICE);
      expect.soft(product).toHaveProperty(REQUIRED_PRODUCT_FIELDS.BRAND);
      expect.soft(product).toHaveProperty(REQUIRED_PRODUCT_FIELDS.CATEGORY);

      expect
        .soft(product.category)
        .toHaveProperty(REQUIRED_CATEGORY_FIELDS.CATEGORY);
      expect
        .soft(product.category)
        .toHaveProperty(REQUIRED_CATEGORY_FIELDS.USERTYPE);
    }
  });

  test("should not create product", async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response = await productsApi.postProduct();

    expect.soft(response.status()).toBe(200);

    const body: ProductsResponse = await response.json();
    expect.soft(body.responseCode).toBe(405);
    expect
      .soft(body.message)
      .toBe(REQUIRED_AUTH_FIELDS.ERROR_MESSAGE_METHOD_NOT_SUPPORTED);
  });

  test("should return searched products by name", async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response = await productsApi.searchProduct(
      CommonData.SEARCH_EXAMPLE_NAME,
    );

    expect.soft(response.status()).toBe(200);

    const body = await response.json();

    expect.soft(body.responseCode).toBe(200);
    expect.soft(Array.isArray(body.products)).toBeTruthy();
    expect.soft(body.products.length).toBe(1);
    expect.soft(body.products[0].id).toBe(1);
    expect.soft(body.products[0].name).toBe(CommonData.SEARCH_EXAMPLE_NAME);
    expect
      .soft(body.products[0].brand)
      .toBe(REQUIRED_PRODUCT_FIELDS.SEARCH_EXAMPLE_BRAND);
    expect.soft(body.products[0].category).toBeDefined();
  });

  test("should not return searched products by name", async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response = await productsApi.searchProduct();

    expect.soft(response.status()).toBe(200);

    const body = await response.json();

    expect.soft(body.responseCode).toBe(400);
    expect.soft(body.message).toBe(REQUIRED_PRODUCT_FIELDS.SEARCH_PRODUCT_MISSING);
  });
});
