export interface Variant {
  id: string;
  size: string;
  price: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: string;
  description: string;
  short_description: string;
  image: string;
  categories: string;
  features: string[];
  variants: Variant[];
}

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: {product: Product};
};
