import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { SearchContext } from '../App';
import { FilterState, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import { Categories, ItemBlock, Pagination, Sort } from '../components';
import { Skeleton } from '../components/ItemBlock/Skeleton';

import { sortList } from '../consts';

export const Home = () => {
  const [products, setProducts] = useState<any>([]);
  // TODO - set correct type for product
  //      - fix a circle for amount of product
  const [isLoading, setIsLoading] = useState(true);

  const selectState = (state: FilterState) => state.filterSlice;
  const { categoryId, sort, currentPage } = useSelector(selectState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const { searchValue } = useContext(SearchContext);

  const fetchProducts = () => {
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
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchProducts();
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
