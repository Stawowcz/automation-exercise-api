// src/api/base-api.ts
import { APIRequestContext, expect } from "@playwright/test";

export class BaseApi {
  protected readonly request: APIRequestContext;
  protected readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async get(endpoint: string) {
    const response = await this.request.get(`${this.baseURL}${endpoint}`);
    expect(response.ok()).toBeTruthy(); // sanity check
    return response;
  }

  async post(endpoint: string, data: object) {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      data,
    });
    return response;
  }

  async postUrlEncoded(endpoint: string, params: Record<string, string>) {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams(params).toString(), // 👈 zamiana obiektu na key=value&key2=value2
    });
    return response;
  }
}
