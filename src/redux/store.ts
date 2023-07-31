import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import productsSlice from './slices/productsSlice';

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
