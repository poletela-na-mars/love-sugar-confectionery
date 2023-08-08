import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filter/slice';
import cartSlice from './cart/slice';
import productsSlice from './product/slice';

// TODO - re-export
export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    productsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
