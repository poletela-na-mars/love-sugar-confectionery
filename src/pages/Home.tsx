import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { FilterState, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import { Categories, ItemBlock, Pagination, Sort } from '../components';
import { Skeleton } from '../components/ItemBlock/Skeleton';

import { SearchContext } from '../App';

export const Home = () => {
  const selectState = (state: FilterState) => state.filterSlice;
  const { categoryId, sort, currentPage } = useSelector(selectState);

  const dispatch = useDispatch();

  const onClickCategoryHandler = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const { searchValue } = useContext(SearchContext);

  const [products, setProducts] = useState<any>([]);
  // TODO - set correct type for product
  //      - fix a circle for amount of product
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = (sort.sortProperty.includes('-') || sort.sortProperty === 'rating') ? 'desc' : 'asc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios.get(
        `https://648e2e662de8d0ea11e89b74.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })

    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  const onPageChangeHandler = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const mappedProducts = products
      .map((product: { id: any; }) => <ItemBlock key={product.id} {...product} />);
  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

  return (
      <div className='container'>
        <div className='content__top'>
          <Categories value={categoryId} onClickCategoryHandler={(idx: number) => onClickCategoryHandler(idx)} />
          <Sort />
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
        <Pagination currentPage={currentPage} onChangePage={onPageChangeHandler} />
      </div>
  );
};
