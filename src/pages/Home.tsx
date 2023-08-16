import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { selectProducts } from '../redux/product/selectors';
import { fetchProducts } from '../redux/product/asyncActions';
import { AppDispatch } from '../redux/store';

import { Categories, ItemBlock, NotFoundProductsBlock, Pagination, Sort } from '../components';
import { Skeleton } from '../components/ItemBlock/Skeleton';

import { Order, sortList, Status } from '../consts';
import { Product } from '../types';

export const Home = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { products, status } = useSelector(selectProducts);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMounted = useRef<boolean>(false);

  const getProducts = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = (sort.sortProperty.includes('-') || sort.sortProperty === 'rating') ? Order.DESC : Order.ASC;
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

  const onClickCategoryHandler = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onPageChangeHandler = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({
        ...params,
        sort
      }));
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

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
  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

  return (
      <div className='container'>
        <div className='content__top'>
          <Categories value={categoryId} onClickCategoryHandler={onClickCategoryHandler} />
          <Sort sort={sort} />
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
                  status === Status.LOADING
                      ? skeletons
                      : (mappedProducts.length ? mappedProducts : <NotFoundProductsBlock />)
                }
              </div>
        }
        <Pagination currentPage={currentPage} onChangePage={onPageChangeHandler} />
      </div>
  );
};
