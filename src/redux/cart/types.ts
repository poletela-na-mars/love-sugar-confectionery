import { ReduxProduct } from '../../types';

export type InitialCartState = {
  totalPrice: number;
  items: ReduxProduct[];
}
