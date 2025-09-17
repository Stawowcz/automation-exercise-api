// src/api/base-api.ts
import { APIRequestContext, expect } from "@playwright/test";

export class BaseApi {
  protected readonly request: APIRequestContext;
  public readonly baseURL: string;

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
      data: new URLSearchParams(params).toString(),
    });
    return response;
  }

  async postUrlEncoded2(endpoint: string, params: Record<string, string>) {
    return this.request.post(`${this.baseURL}${endpoint}`, {
      form: params,
    });
  }

  async putUrlEncoded2(endpoint: string, params: Record<string, string>) {
    return this.request.put(`${this.baseURL}${endpoint}`, {
      form: params,
    });
  }

  async deleteUrlEncoded2(endpoint: string) {
    return this.request.delete(`${this.baseURL}${endpoint}`);
  }

  async deleteUserUrlEncoded2(
    endpoint: string,
    params: Record<string, string>,
  ) {
    return this.request.delete(`${this.baseURL}${endpoint}`, {
      form: params,
    });
  }

  async getWithParams(endpoint: string, params: Record<string, string>) {
    const query = new URLSearchParams(params).toString();
    const url = `${this.baseURL}${endpoint}?${query}`;

    const response = await this.request.get(url);
    expect(response.ok()).toBeTruthy();
    return response;
  }
}
