import { SetStateAction, useEffect, useState } from 'react';

import { Categories, ItemBlock, Sort } from '../components';
import { Skeleton } from '../components/ItemBlock/Skeleton';

export const Home = () => {
  const [products, setProducts] = useState<any>([]);
  // TODO - set correct type for product
  const [isLoading, setIsLoading] = useState(true);
  const [activeCat, setActiveCat] = useState(0);
  const [selectedSort, setSelectedSort] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const sortBy = selectedSort.sortProperty.replace('-', '');
    const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = activeCat > 0 ? `category=${activeCat}` : '';

    fetch(`https://648e2e662de8d0ea11e89b74.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
        .then((res) => res.json())
        .then((arr) => {
          setProducts(arr);
          setIsLoading(false);
        });
    window.scrollTo(0, 0);
  }, [activeCat, selectedSort]);

  return (
      <div className='container'>
        <div className='content__top'>
          <Categories value={activeCat} onClickCategoryHandler={(idx: SetStateAction<number>) => setActiveCat(idx)} />
          <Sort value={selectedSort}
                onClickSortHandler={(idx: SetStateAction<{ name: string; sortProperty: string; }>) => setSelectedSort(
                    idx)} />
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
