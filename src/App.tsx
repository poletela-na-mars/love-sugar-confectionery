import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import { Home, NotFound, Cart } from './pages';

import './scss/app.scss';
import { useState } from 'react';

// TODO - change classNames
//      - delete products.json

export const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
      <>
        <div className='wrapper'>
          <Header searchValue={searchValue} setSearchValue={setSearchValue} />
          <div className='content'>
            <Routes>
              <Route path='/' element={<Home searchValue={searchValue} />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </>
  );
};
