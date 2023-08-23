import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Link } from 'react-router-dom';

import emptyCartImg from './../../assets/img/empty-cart.png';


export const CartEmpty = () => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
      <div className='container'>
        <div className='cart cart--empty'>
          <h2>Корзина пустая</h2>
          <p>
            Чтобы заказать нашу великолепную продукцию, перейдите на главную страницу.
          </p>
          {
              !isImgLoaded &&
              <ContentLoader
                  className='cart--empty__img'
                  speed={2}
                  width={300}
                  height={300}
                  viewBox='0 0 300 300'
                  backgroundColor='#f3f3f3'
                  foregroundColor='#ecebeb'
              >
                <rect x='0' y='0' rx='0' ry='0' width='300' height='300' />
              </ContentLoader>
          }
          <img style={isImgLoaded ? {} : { display: 'none' }} src={emptyCartImg} alt='Empty cart'
               onLoad={() => setIsImgLoaded(true)} />
          <Link to='/' className='button button--black'>
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
  );
};
