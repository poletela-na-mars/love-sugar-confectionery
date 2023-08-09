import { Product } from '../../types';
import { Status } from '../../consts';

export type ProductsState = {
  products: Product[];
  status: Status;
}
