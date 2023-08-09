import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { FetchProductsArgs, Product } from '../../types';

export const fetchProducts = createAsyncThunk<Product[], FetchProductsArgs>(
    'products/fetchProductsStatus',
    async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      const { data } = await axios.get<Product[]>(
          `https://648e2e662de8d0ea11e89b74.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`);

      return data;
    }
);
