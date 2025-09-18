import { APIRequestContext, expect } from "@playwright/test";

export class BaseApi {
  protected readonly request: APIRequestContext;
  public readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async post(endpoint: string, data: object) {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      data,
    });
    return response;
  }

  async postForm(endpoint: string, params: Record<string, string>) {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      form: params,
    });
    return response;
  }

  async putForm(endpoint: string, params: Record<string, string>) {
    const response = await this.request.put(`${this.baseURL}${endpoint}`, {
      form: params,
    });
    return response;
  }

  async delete(endpoint: string, params?: Record<string, string>) {
    const response = await this.request.delete(`${this.baseURL}${endpoint}`, {
      ...(params ? { form: params } : {}),
    });
    return response;
  }

  async get(endpoint: string, params?: Record<string, string>) {
    const url = params
      ? `${this.baseURL}${endpoint}?${new URLSearchParams(params).toString()}`
      : `${this.baseURL}${endpoint}`;

    const response = await this.request.get(url);
    return response;
  }
}
