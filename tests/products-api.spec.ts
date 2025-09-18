import { test, expect } from "@playwright/test";
import { ProductsApi } from "@api/products-api";
import { ProductsResponse } from "@typings/api-types";
import { CommonData } from "@utils/user-data";
import { API_RESPONSE_MESSAGES } from "@utils/api-messages";
import { API_PROPERTIES } from "@utils/api-properties";
import { API_VALUES } from "@utils/api-values";

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
      expect.soft(product).toHaveProperty(API_PROPERTIES.ID);
      expect.soft(product).toHaveProperty(API_PROPERTIES.NAME);
      expect.soft(product).toHaveProperty(API_PROPERTIES.PRICE);
      expect.soft(product).toHaveProperty(API_PROPERTIES.BRAND);
      expect.soft(product).toHaveProperty(API_PROPERTIES.CATEGORY);

      expect.soft(product.category).toHaveProperty(API_PROPERTIES.CATEGORY);
      expect.soft(product.category).toHaveProperty(API_PROPERTIES.USERTYPE);
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
      .toBe(API_RESPONSE_MESSAGES.ERROR_MESSAGE_METHOD_NOT_SUPPORTED);
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
    expect.soft(body.products[0].brand).toBe(API_VALUES.SEARCH_BRAND);
    expect.soft(body.products[0].category).toBeDefined();
  });

  test("should not return searched products by name", async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response = await productsApi.searchProduct();

    expect.soft(response.status()).toBe(200);

    const body = await response.json();

    expect.soft(body.responseCode).toBe(400);
    expect
      .soft(body.message)
      .toBe(API_RESPONSE_MESSAGES.SEARCH_PRODUCT_MISSING);
  });
});
