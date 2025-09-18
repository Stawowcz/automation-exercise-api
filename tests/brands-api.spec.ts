import { test, expect } from "@playwright/test";
import { BrandsResponse } from "@typings/api-types";
import { BrandsApi } from "@api/brands-api";
import { CommonConstants } from "@constants/common";
import { REQUIRED_BRAND_FIELDS } from "@constants/brand/brand-fields";
import { REQUIRED_AUTH_FIELDS } from "@constants/auth/auth-fields";

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
    expect.soft(body.brands).toHaveLength(REQUIRED_BRAND_FIELDS.EXPECTED_COUNT);
    for (const brand of body.brands) {
      expect.soft(brand).toHaveProperty(REQUIRED_BRAND_FIELDS.ID);
      expect.soft(brand).toHaveProperty(REQUIRED_BRAND_FIELDS.BRAND);
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
      .toBe(REQUIRED_AUTH_FIELDS.ERROR_MESSAGE_METHOD_NOT_SUPPORTED);
  });
});
