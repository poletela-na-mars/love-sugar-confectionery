import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServerURL } from '../../consts';
import { FetchProductsArgs, Product } from '../../types';

export const fetchProducts = createAsyncThunk<Product[], FetchProductsArgs>(
    'products/fetchProductsStatus',
    async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      const { data } = await axios.get<Product[]>(
          `${ServerURL}?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`);

      return data;
    }
);
