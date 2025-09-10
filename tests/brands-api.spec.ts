import { test, expect } from "@playwright/test";
import { BrandsResponse } from "../src/types/api-types";
import { BrandsApi } from "../src/api/brands-api";
import { CommonConstants } from "../src/constants/common/common-constants";
import { REQUIRED_BRAND_FIELDS } from "../src/constants/brand/brand-fields";
// import { REQUIRED_BRAND_FIELDS } from "../../src/constants/common/common-fields";

test.describe("Brands API", () => {
  test("should return all brands", async ({ request }) => {
    const brandsApi = new BrandsApi(request);
    const response = await brandsApi.getAllBrands();

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain(
      "text/html; charset=utf-8",
    );

    const body: BrandsResponse = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.brands).toHaveLength(CommonConstants.EXPECTED_COUNT);

    for (const brand of body.brands) {
      expect(brand).toHaveProperty(REQUIRED_BRAND_FIELDS.ID);
      expect(brand).toHaveProperty(REQUIRED_BRAND_FIELDS.BRAND);
    }
  });

  test("should not create brand", async ({ request }) => {
    const brandsApi = new BrandsApi(request);
    const response = await brandsApi.postBrand();

    expect(response.status()).toBe(200);

    const body: BrandsResponse = await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe(
      CommonConstants.ERROR_MESSAGE_METHOD_NOT_SUPPORTED,
    );
  });
});
