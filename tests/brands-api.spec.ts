import { test, expect } from "@playwright/test";
import { BrandsResponse } from "@typings/api-types";
import { BrandsApi } from "@api/brands-api";
import { API_RESPONSE_MESSAGES } from "@utils/api-messages";
import { API_PROPERTIES } from "@utils/api-properties";

test.describe("Brands API", () => {
  test("should return all brands", async ({ request }) => {
    const brandsApi = new BrandsApi(request);
    const response = await brandsApi.getAllBrands();
    expect.soft(response.status()).toBe(200);
    expect
      .soft(response.headers()["content-type"])
      .toContain("text/html; charset=utf-8");
    const body: BrandsResponse = await response.json();
    expect.soft(body.responseCode).toBe(200);
    expect.soft(body.brands).toHaveLength(34);
    for (const brand of body.brands) {
      expect.soft(brand).toHaveProperty(API_PROPERTIES.ID);
      expect.soft(brand).toHaveProperty(API_PROPERTIES.BRAND);
    }
  });

  test("should not create brand", async ({ request }) => {
    const brandsApi = new BrandsApi(request);
    const response = await brandsApi.postBrand();
    expect.soft(response.status()).toBe(200);
    const body: BrandsResponse = await response.json();
    expect.soft(body.responseCode).toBe(405);
    expect
      .soft(body.message)
      .toBe(API_RESPONSE_MESSAGES.ERROR_MESSAGE_METHOD_NOT_SUPPORTED);
  });
});
