export const REQUIRED_PRODUCT_FIELDS = {
  ID: "id",
  NAME: "name",
  PRICE: "price",
  BRAND: "brand",
  CATEGORY: "category",
  SEARCH_PRODUCT_MISSING:
    "Bad request, search_product parameter is missing in POST request.",
  SEARCH_EXAMPLE_BRAND: "Polo",
} as const;
