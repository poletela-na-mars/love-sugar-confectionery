import { CartProduct } from '../types';

export const calcTotalPrice = (items: CartProduct[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
