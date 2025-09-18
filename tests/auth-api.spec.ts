import { test, expect } from "@playwright/test";
import { LoginApi } from "@api/login-api";
import { REQUIRED_AUTH_FIELDS } from "@constants/auth/auth-fields";

test.describe("Auth API", () => {
  test("should login", async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.verifyLogin(
      process.env.USER!,
      process.env.PASSWORD!,
    );
    expect.soft(response.status()).toBe(200);
  });

  test("should not login with incorrect credential", async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.verifyLogin(
      process.env.INCORRECT_USER!,
      process.env.INCORRECT_PASSWORD!,
    );
    const body = await response.json();
    expect.soft(body.responseCode).toBe(404);
    expect.soft(body.message).toBe(REQUIRED_AUTH_FIELDS.USER_NOT_FOUND);
  });

  test("should not login without email", async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.verifyLoginNoEmail(
      process.env.INCORRECT_PASSWORD!,
    );
    const body = await response.json();
    expect.soft(body.responseCode).toBe(400);
    expect.soft(body.message).toBe(REQUIRED_AUTH_FIELDS.EMAIL_PASSWORD_MISSING);
  });

  test("should delete login", async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.deleteLogin();
    const body = await response.json();
    expect.soft(body.responseCode).toBe(405);
    expect
      .soft(body.message)
      .toBe(REQUIRED_AUTH_FIELDS.ERROR_MESSAGE_METHOD_NOT_SUPPORTED);
  });
});
