import { Route, Routes } from 'react-router-dom';
import { Cart, FullProduct, Home, NotFound } from './pages';

import { MainLayout } from './layouts/MainLayout';
import './scss/app.scss';

// TODO - change classNames
//      - delete products.json
//      - change price cause of type

export const App = () => {
  return (
      <>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='' element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='product/:id' element={<FullProduct />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </>
  );
};
