import { test, expect } from "@playwright/test";
import { RegisterData, UpdatedData } from "@data/user-data";
import { RegisterApi } from "@api/register-api";
import { API_RESPONSE_MESSAGES } from "@data/api-messages";

test.describe("User Management API", () => {
  test("should register new user", async ({ request }) => {
    const registerAPi = new RegisterApi(request);
    const response = await registerAPi.registerUser(RegisterData);
    const body = await response.json();
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe(API_RESPONSE_MESSAGES.USER_CREATED);
  });

  test("should create, update, delete user", async ({ request }) => {
    const registerApi = new RegisterApi(request);
    const responseCreate = await registerApi.registerUser(RegisterData);
    const bodyCreate = await responseCreate.json();
    expect.soft(bodyCreate.responseCode).toBe(201);
    expect.soft(bodyCreate.message).toBe(API_RESPONSE_MESSAGES.USER_CREATED);

    const responseUpdate = await registerApi.updateUser({
      ...UpdatedData,
      email: RegisterData.email,
      password: RegisterData.password,
    });
    const bodyUpdate = await responseUpdate.json();
    expect.soft(bodyUpdate.responseCode).toBe(200);
    expect(bodyUpdate.message).toBe(API_RESPONSE_MESSAGES.USER_UPDATED);

    const responseDelete = await registerApi.deleteUser(
      RegisterData.email,
      RegisterData.password,
    );
    const bodyDelete = await responseDelete.json();
    expect.soft(bodyDelete.responseCode).toBe(200);
    expect.soft(bodyDelete.message).toBe(API_RESPONSE_MESSAGES.ACCOUNT_DELETED);
  });

  test("should get details of user", async ({ request }) => {
    const registerApi = new RegisterApi(request);

    const responseCreate = await registerApi.registerUser(RegisterData);
    const bodyCreate = await responseCreate.json();
    expect.soft(bodyCreate.responseCode).toBe(201);
    expect.soft(bodyCreate.message).toBe(API_RESPONSE_MESSAGES.USER_CREATED);

    const responseGet = await registerApi.getUserDetailByEmail(
      RegisterData.email,
    );
    const bodyGet = await responseGet.json();

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
    expect
      .soft(bodyGet.user)
      .toHaveProperty("last_name", RegisterData.lastname);
    expect.soft(bodyGet.user).toHaveProperty("company", RegisterData.company);
    expect.soft(bodyGet.user).toHaveProperty("address1", RegisterData.address1);
    expect.soft(bodyGet.user).toHaveProperty("address2", RegisterData.address2);
    expect.soft(bodyGet.user).toHaveProperty("country", RegisterData.country);
    expect.soft(bodyGet.user).toHaveProperty("state", RegisterData.state);
    expect.soft(bodyGet.user).toHaveProperty("city", RegisterData.city);
    expect.soft(bodyGet.user).toHaveProperty("zipcode", RegisterData.zipcode);
  });
});
