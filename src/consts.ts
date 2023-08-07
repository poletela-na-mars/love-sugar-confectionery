import { SortType } from './types';

export const CategoriesList = ['Все', 'Торты', 'Пирожные', 'Выпечка', 'Хлеб', 'Мороженое'];

export enum SortProperty {
  RATING_DESC = 'rating',
  TITLE_DESC = 'title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
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
