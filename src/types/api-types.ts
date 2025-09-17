// typings/api-types.ts
export interface Product {
  id: number;
  name: string;
  category: { id: number; name: string };
  price: string;
  brand: string;
}

export interface ProductsResponse {
  responseCode: number;
  message: string;
  products: Product[];
}

export interface Brand {
  id: number;
  brand: string;
}

export interface BrandsResponse {
  responseCode: number;
  message: string;
  brands: Brand[];
}
