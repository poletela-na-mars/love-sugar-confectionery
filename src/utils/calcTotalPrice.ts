import { ReduxProduct } from '../types';

export const calcTotalPrice = (items: ReduxProduct[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
