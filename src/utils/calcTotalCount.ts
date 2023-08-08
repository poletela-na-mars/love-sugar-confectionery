import { ReduxProduct } from '../types';

export const calcTotalCount = (items: ReduxProduct[]) => {
  return items.reduce((count, obj) => obj.count + count, 0);
};
