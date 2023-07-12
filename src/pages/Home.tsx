import { SetStateAction, useEffect, useState } from 'react';

import { Categories, ItemBlock, Pagination, Sort } from '../components';
import { Skeleton } from '../components/ItemBlock/Skeleton';

export const Home = (props: { searchValue: string }) => {
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    const search = props.searchValue ? `&search=${props.searchValue}` : '';

    fetch(
        `https://648e2e662de8d0ea11e89b74.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then((res) => res.json())
        .then((arr) => {
          setProducts(arr);
          setIsLoading(false);
        });
    window.scrollTo(0, 0);
  }, [activeCat, selectedSort, props.searchValue, currentPage]);

  const mappedProducts = products
      .map((product: { id: any; }) => <ItemBlock key={product.id} {...product} />);
  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

  return (
      <div className='container'>
        <div className='content__top'>
          <Categories value={activeCat} onClickCategoryHandler={(idx: SetStateAction<number>) => setActiveCat(idx)} />
          <Sort value={selectedSort}
                onClickSortHandler={(idx: SetStateAction<{ name: string; sortProperty: string; }>) =>
                    setSelectedSort(idx)}
          />
        </div>
        <h2 className='content__title'>Все изделия</h2>
        <div className='content__items'>
          {
            // TODO - remove any
            isLoading
                ? skeletons
                : mappedProducts
          }
        </div>
        <Pagination onChangePage={(number: SetStateAction<number>) => setCurrentPage(number)} />
      </div>
  );
};
