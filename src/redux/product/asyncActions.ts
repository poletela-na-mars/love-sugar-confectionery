import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { FetchProductsArgs, ReduxProduct } from '../../types';

export const fetchProducts = createAsyncThunk<ReduxProduct[], FetchProductsArgs>(
    'products/fetchProductsStatus',
    async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      const { data } = await axios.get<ReduxProduct[]>(
          `https://648e2e662de8d0ea11e89b74.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`);

      return data;
    }
);
