import { ReduxProduct } from '../../types';
import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cartSlice;
export const selectCartItemsById = (id: number) => (state: RootState) => state.cartSlice.items.filter(
    (obj: ReduxProduct) => obj.id === id);
