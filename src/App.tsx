import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import { Home, NotFound, Cart } from './pages';

import './scss/app.scss';

// TODO - change classNames
//      - delete products.json

type ContextType = { searchValue: string; setSearchValue: React.Dispatch<React.SetStateAction<string>>; };
export const SearchContext = createContext<ContextType>({searchValue: '', setSearchValue: () => {}});

export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
      <>
        <div className='wrapper'>
          <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <Header />
            <div className='content'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </SearchContext.Provider>
        </div>
      </>
  );
};
