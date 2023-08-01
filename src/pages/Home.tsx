import { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { SearchContext } from '../App';
import { FilterState, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchProducts, ProductsState } from '../redux/slices/productsSlice';
import { AppDispatch } from '../redux/store';

import { Categories, ItemBlock, Pagination, Sort } from '../components';
import { Skeleton } from '../components/ItemBlock/Skeleton';

import { sortList } from '../consts';
import { Product } from '../types';

export const Home = () => {
  // TODO - fix a circle for amount of product
  const selectState = (state: FilterState) => state.filterSlice;
  const { categoryId, sort, currentPage } = useSelector(selectState);

  const selectProducts = (state: ProductsState) => state.productsSlice;
  const { products, status } = useSelector(selectProducts);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const { searchValue } = useContext(SearchContext);

  const getProducts = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = (sort.sortProperty.includes('-') || sort.sortProperty === 'rating') ? 'desc' : 'asc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchProducts({
          sortBy,
          order,
          category,
          search,
          currentPage,
        })
    );

    window.scrollTo(0, 0);
  };

  const onClickCategoryHandler = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onPageChangeHandler = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({
        ...params,
        sort
      }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getProducts();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const mappedProducts = products.map((product: Product) => <ItemBlock key={product.id} {...product} />);
  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx}/>);

  return (
      <div className='container'>
        <div className='content__top'>
          <Categories value={categoryId} onClickCategoryHandler={(idx: number) => onClickCategoryHandler(idx)}/>
          <Sort/>
        </div>
        <h2 className='content__title'>Все изделия</h2>
        {
          status === 'error'
              ? <div className='content__error-info'>
                <h2>Произошла ошибка</h2>
                <p>К сожалению, не удалось получить данные. Попробуйте повторить попытку позже.</p>
              </div>
              : <div className='content__items'>
                {
                  status === 'loading'
                      ? skeletons
                      : mappedProducts
                }
              </div>
        }
        <Pagination currentPage={currentPage} onChangePage={onPageChangeHandler}/>
      </div>
  );
};
