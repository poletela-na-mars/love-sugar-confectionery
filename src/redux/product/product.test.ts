import { configureStore } from '@reduxjs/toolkit';

import productsSlice from './slice';
import { fetchProducts } from './asyncActions';

import { ProductsState } from './types';

import { Order, Status } from '../../consts';

let initialState: ProductsState = {
  products: [],
  status: Status.LOADING,
};

let fetchParams = {
  sortBy: 'rating',
  order: Order.DESC,
  category: '',
  search: '&search=Брауни',
  currentPage: 1,
};

let mockProducts =
    [
      {
        id: "1",
        imageUrl: 'brownie',
        title: 'Брауни',
        types: [
          0
        ],
        price: {
          0: 89
        },
        category: 2,
        rating: 6,
        composition: 'Шоколад (какао тертое, сахар, какао-масло, эмульгатор лецитин), яичный меланж, сахар, масло сливочное, мука высший сорт, соль'
      },
    ];

describe('Products reducers', () => {
  describe('fetchProducts', () => {

    it('should set status to LOADING in fetchProducts.pending', () => {
      initialState.status = Status.SUCCESS;

      expect(productsSlice(initialState, { type: fetchProducts.pending.type, payload: fetchParams }).status)
          .toEqual(Status.LOADING);
    });

    it('should set products to [] in fetchProducts.pending', () => {
      expect(productsSlice(initialState, { type: fetchProducts.pending.type, payload: fetchParams }).products)
          .toEqual([]);
    });

    it('should set status to ERROR in fetchProducts.rejected', () => {
      initialState.status = Status.LOADING;

      expect(productsSlice(initialState, { type: fetchProducts.rejected.type, payload: fetchParams }).status)
          .toEqual(Status.ERROR);
    });

    it('should set products to [] in fetchProducts.rejected', () => {
      expect(productsSlice(initialState, { type: fetchProducts.rejected.type, payload: fetchParams }).products)
          .toEqual([]);
    });

    it('should set status to SUCCESS in fetchProducts.fulfilled', () => {
      initialState.status = Status.LOADING;

      expect(productsSlice(initialState, { type: fetchProducts.fulfilled.type, payload: fetchParams }).status)
          .toEqual(Status.SUCCESS);
    });

    it('should set products successfully', async () => {
      const store = configureStore({ reducer: productsSlice });
      await store.dispatch(fetchProducts(fetchParams));
      expect(store.getState().products).toEqual(mockProducts);
    });
  });
});
