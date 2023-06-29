import { useEffect, useState } from 'react';

import { Categories, ItemBlock, Sort } from '../components';
import { Skeleton } from '../components/ItemBlock/Skeleton';

export const Home = () => {
  const [products, setProducts] = useState<any>([]);
  // TODO - set correct type for product
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://648e2e662de8d0ea11e89b74.mockapi.io/items')
        .then((res) => res.json())
        .then((arr) => {
          setProducts(arr);
          setIsLoading(false);
        });
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className='container'>
        <div className='content__top'>
          <Categories />
          <Sort />
        </div>
        <h2 className='content__title'>Все изделия</h2>
        <div className='content__items'>
          {
            // TODO - remove any
            isLoading
                ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
                : products.map((product: { id: any; }) => <ItemBlock key={product.id} {...product} />)
          }
        </div>
      </div>
  );
};
