import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages';

import { MainLayout } from './layouts/MainLayout';

import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullProduct = React.lazy(() => import(/* webpackChunkName: "FullProduct" */ './pages/FullProduct'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

export const App = () => {
  return (
      <>
        <Suspense fallback={<h2 className='loading'>Загрузка...</h2>}>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route path='' element={<Home />} />
              <Route path='cart' element={<Cart />} />
              <Route path='product/:id' element={<FullProduct />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </>
  );
};
