import { ReduxProduct } from '../../types';
import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cartSlice;
export const selectCartItemById = (id: number) => (state: RootState) => state.cartSlice.items.find(
    (obj: ReduxProduct) => obj.id === id);
