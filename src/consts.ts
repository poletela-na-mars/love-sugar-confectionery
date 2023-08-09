import { SortType } from './types';

export const ServerURL = 'https://648e2e662de8d0ea11e89b74.mockapi.io/items';

export const CategoriesList = ['Все', 'Торты', 'Пирожные', 'Выпечка', 'Хлеб', 'Мороженое'];

export enum SortProperty {
  RATING_DESC = 'rating',
  TITLE_DESC = 'title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export enum Order {
  DESC = 'desc',
  ASC = 'asc',
}

export const sortList: SortType[] = [
  { name: 'популярности', sortProperty: SortProperty.RATING_DESC },
  { name: 'возрастанию цены', sortProperty: SortProperty.PRICE_DESC },
  { name: 'убыванию цены', sortProperty: SortProperty.PRICE_ASC },
  { name: 'алфавиту', sortProperty: SortProperty.TITLE_DESC },
];

export const typeNames = ['стандартный', 'половина', 'кусочек', 'целый'];

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
