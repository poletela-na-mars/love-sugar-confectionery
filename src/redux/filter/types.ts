import { SortType } from '../../types';

export type FilterState = {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: SortType;
}
