import { CartProduct } from '../types';

export const calcTotalCount = (items: CartProduct[]) => {
  return items.reduce((count, obj) => obj.count + count, 0);
};
