import React from 'react';
import logo from './img/logo.png';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import ItemBlock from './components/ItemBlock';

import './scss/app.scss';

const App = () => {
  return (
    <>
      <header>
        <img src={logo} width='300' alt='logo' />
      </header>

      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              <Categories />
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              <ItemBlock title='Пирожное Картошка' price={240} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
