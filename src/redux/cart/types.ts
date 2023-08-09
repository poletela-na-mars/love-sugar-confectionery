import { CartProduct } from '../../types';

export type InitialCartState = {
  totalPrice: number;
  items: CartProduct[];
}
