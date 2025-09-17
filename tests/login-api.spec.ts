import { test, expect } from "@playwright/test";
import { CommonConstants } from "../src/constants/common/common-constants";
import { LoginApi } from "../src/api/login-api";
import { RegisterData, UpdatedData } from "../src/data/common-data";
import { RegisterApi } from "../src/api/register-api";

test.describe("Brands API", () => {
  test("should login", async ({ request }) => {
    const loginApi = new LoginApi(request);
    const response = await loginApi.verifyLogin(
      process.env.USER!,
      process.env.PASSWORD!,
    );

    expect.soft(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });
});

test("should not login with incorrect credential", async ({ request }) => {
  const loginApi = new LoginApi(request);
  const response = await loginApi.verifyLogin(
    process.env.INCORRECT_USER!,
    process.env.INCORRECT_PASSWORD!,
  );
  const body = await response.json();
  expect.soft(body.responseCode).toBe(404);
  expect.soft(body.message).toBe(CommonConstants.USER_NOT_FOUND);
});

test("should not login without email", async ({ request }) => {
  const loginApi = new LoginApi(request);
  const response = await loginApi.verifyLoginNoEmail(
    process.env.INCORRECT_PASSWORD!,
  );
  const body = await response.json();
  expect.soft(body.responseCode).toBe(400);
  expect.soft(body.message).toBe(CommonConstants.EMAIL_PASSWORD_MISSING);
});

test("should delete login", async ({ request }) => {
  const loginApi = new LoginApi(request);
  const response = await loginApi.deleteLogin();
  const body = await response.json();
  expect.soft(body.responseCode).toBe(405);
  expect
    .soft(body.message)
    .toBe(CommonConstants.ERROR_MESSAGE_METHOD_NOT_SUPPORTED);
});

test("should register new user", async ({ request }) => {
  const registerAPi = new RegisterApi(request);

  const response = await registerAPi.registerUser(RegisterData);

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(201);
  expect(body.message).toBe(CommonConstants.USER_CREATED);
});

test("should create, update, delete user", async ({ request }) => {
  const registerApi = new RegisterApi(request);

  const responseCreate = await registerApi.registerUser(RegisterData);
  expect.soft(responseCreate.status()).toBe(200);
  const bodyCreate = await responseCreate.json();
  expect.soft(bodyCreate.responseCode).toBe(201);
  expect.soft(bodyCreate.message).toBe(CommonConstants.USER_CREATED);

  const responseUpdate = await registerApi.updateUser({
    ...UpdatedData,
    email: RegisterData.email,
    password: RegisterData.password,
  });
  const bodyUpdate = await responseUpdate.json();
  expect.soft(bodyUpdate.responseCode).toBe(200);
  expect(bodyUpdate.message).toBe(CommonConstants.USER_UPDATED);

  const responseDelete = await registerApi.deleteUser(
    RegisterData.email,
    RegisterData.password,
  );
  const bodyDelete = await responseDelete.json();
  expect.soft(bodyDelete.responseCode).toBe(200);
  expect.soft(bodyDelete.message).toBe(CommonConstants.ACCOUNT_DELETED);
});

test.only("should create, get details, update and delete user", async ({
  request,
}) => {
  const registerApi = new RegisterApi(request);

  const responseCreate = await registerApi.registerUser(RegisterData);
  expect.soft(responseCreate.status()).toBe(200);
  const bodyCreate = await responseCreate.json();
  expect.soft(bodyCreate.responseCode).toBe(201);
  expect.soft(bodyCreate.message).toBe(CommonConstants.USER_CREATED);

  const responseGet = await registerApi.getUserDetailByEmail(
    RegisterData.email,
  );
  expect.soft(responseGet.status()).toBe(200);

  const bodyGet = await responseGet.json();
  console.log("User detail:", bodyGet);

  expect.soft(bodyGet.responseCode).toBe(200);
  expect.soft(bodyGet.user).toHaveProperty("id");
  expect.soft(bodyGet.user).toHaveProperty("email", RegisterData.email);
  expect.soft(bodyGet.user).toHaveProperty("name", RegisterData.name);
  expect.soft(bodyGet.user).toHaveProperty("title", RegisterData.title);
  expect
    .soft(bodyGet.user)
    .toHaveProperty("birth_day", RegisterData.birth_date);
  expect
    .soft(bodyGet.user)
    .toHaveProperty("birth_month", RegisterData.birth_month);
  expect
    .soft(bodyGet.user)
    .toHaveProperty("birth_year", RegisterData.birth_year);
  expect
    .soft(bodyGet.user)
    .toHaveProperty("first_name", RegisterData.firstname);
  expect.soft(bodyGet.user).toHaveProperty("last_name", RegisterData.lastname);
  expect.soft(bodyGet.user).toHaveProperty("company", RegisterData.company);
  expect.soft(bodyGet.user).toHaveProperty("address1", RegisterData.address1);
  expect.soft(bodyGet.user).toHaveProperty("address2", RegisterData.address2);
  expect.soft(bodyGet.user).toHaveProperty("country", RegisterData.country);
  expect.soft(bodyGet.user).toHaveProperty("state", RegisterData.state);
  expect.soft(bodyGet.user).toHaveProperty("city", RegisterData.city);
  expect.soft(bodyGet.user).toHaveProperty("zipcode", RegisterData.zipcode);
});
