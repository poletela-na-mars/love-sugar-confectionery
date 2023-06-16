import { Header, Categories, Sort, ItemBlock } from './components';

import products from './assets/products.json';

import './scss/app.scss';

// TODO - change classNames

export const App = () => {
  return (
      <>
        <div className='wrapper'>
          <Header />
          <div className='content'>
            <div className='container'>
              <div className='content__top'>
                <Categories />
                <Sort />
              </div>
              <h2 className='content__title'>Все изделия</h2>
              <div className='content__items'>
                {
                  products.map((product) =>
                      <ItemBlock key={product.id} {...product} />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </>
  );
};
