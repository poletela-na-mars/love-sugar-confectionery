import filterSlice, { setCategoryId, setCurrentPage, setFilters, setSearchValue, setSort } from './slice';

import { FilterState } from './types';
import { SortType } from '../../types';

import { SortProperty } from '../../consts';

let initialState: FilterState = {
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

describe('Filter reducers', () => {
  describe('setCategoryId', () => {
    it('should change categoryId', () => {
      const mockCategory = 2;
      expect(filterSlice(initialState, setCategoryId(mockCategory)).categoryId)
          .toEqual(mockCategory);
    });
  });

  describe('setSearchValue', () => {
    it('should change searchValue', () => {
      const mockSearchValue = 'Брауни';
      expect(filterSlice(initialState, setSearchValue(mockSearchValue)).searchValue)
          .toEqual(mockSearchValue);
    });
  });

  describe('setSort', () => {
    it('should change sort', () => {
      const mockSort: SortType = {
        name: 'алфавиту',
        sortProperty: SortProperty.TITLE_DESC,
      };
      expect(filterSlice(initialState, setSort(mockSort)).sort)
          .toEqual(mockSort);
    });
  });

  describe('setCurrentPage', () => {
    it('should change currentPage', () => {
      const mockCurrentPage = 2;
      expect(filterSlice(initialState, setCurrentPage(mockCurrentPage)).currentPage)
          .toEqual(mockCurrentPage);
    });
  });

  describe('setFilters', () => {
    it('should change filters (without searchValue)', () => {
      const mockFilters: FilterState = {
        searchValue: 'Морковный',
        currentPage: 1,
        categoryId: 4,
        sort: {
          name: 'популярности',
          sortProperty: 'rating',
        },
      };

      expect(filterSlice(initialState, setFilters(mockFilters)))
          .toEqual(Object.assign(mockFilters, mockFilters.searchValue = ''));
    });
  });
});
