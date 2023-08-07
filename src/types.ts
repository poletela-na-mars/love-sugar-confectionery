export interface Product {
  id: number;
  types: number[];
  title: string;
  price: number;
  rating: number;
  category: number;
  imageUrl: string;
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
