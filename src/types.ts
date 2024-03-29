type Price = Record<number, number>;

export interface Product {
  id: number;
  types: number[];
  title: string;
  price: Price;
  rating: number;
  category: number;
  imageUrl: string;
  composition: string;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number;
  count: number;
}

export interface SortType {
  name: string;
  sortProperty: 'price' | '-price' | 'title' | 'rating';
}

export interface FetchProductsArgs {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
}
