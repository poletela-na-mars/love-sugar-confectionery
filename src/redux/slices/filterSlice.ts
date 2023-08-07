import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SortType } from '../../types';

type FilterState = {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: SortType;
}

const initialState: FilterState = {
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  }
});

export const selectFilter = (state: RootState) => state.filterSlice;
export const selectSort = (state: RootState) => state.filterSlice.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
