import { test, expect } from "@playwright/test";
import { LoginApi } from "@api/login-api";
import { API_RESPONSE_MESSAGES } from "@data/api-messages";
import { env } from "../src/config/env";

test.describe("Auth API", () => {
  test("should login", async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.verifyLogin(
      env.USER,
      env.PASSWORD,
    );
    expect.soft(response.status()).toBe(200);
  });

  test("should not login with incorrect credential", async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.verifyLogin(
      env.INCORRECT_USER,
      env.INCORRECT_PASSWORD,
    );
    const body = await response.json();
    expect.soft(body.responseCode).toBe(404);
    expect.soft(body.message).toBe(API_RESPONSE_MESSAGES.USER_NOT_FOUND);
  });

  test("should not login without email", async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.verifyLoginNoEmail(
      env.INCORRECT_PASSWORD,
    );
    const body = await response.json();
    expect.soft(body.responseCode).toBe(400);
    expect
      .soft(body.message)
      .toBe(API_RESPONSE_MESSAGES.EMAIL_PASSWORD_MISSING);
  });

  test("should delete login", async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.deleteLogin();
    const body = await response.json();
    expect.soft(body.responseCode).toBe(405);
    expect
      .soft(body.message)
      .toBe(API_RESPONSE_MESSAGES.ERROR_MESSAGE_METHOD_NOT_SUPPORTED);
  });
});
