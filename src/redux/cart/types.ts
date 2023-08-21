import { CartProduct } from '../../types';

export type CartState = {
  totalPrice: number;
  items: CartProduct[];
}
