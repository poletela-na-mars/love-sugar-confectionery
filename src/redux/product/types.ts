import { ReduxProduct } from '../../types';
import { Status } from '../../consts';

export type ProductsState = {
  products: ReduxProduct[];
  status: Status;
}
