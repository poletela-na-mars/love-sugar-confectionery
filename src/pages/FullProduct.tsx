import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Popup } from '../components';

import { CategoriesList, ServerURL, typeNames } from '../consts';
import images from '../assets/img';
import { CartProduct, Product } from '../types';

import { addItem, minusItem } from '../redux/cart/slice';
import { selectCartItemsByType } from '../redux/cart/selectors';
import { calcTotalCount } from '../utils/calcTotalCount';

const FullProduct = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [product, setProduct] = useState<Product>();
  const [activeType, setActiveType] = useState<number>();
  const [itemCount, setItemCount] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get<Product>(`${ServerURL}/${id}`);
        setProduct(data);
        setActiveType(data.types[0]);
      } catch (err) {
        setIsPopupOpen(true);
      }
    }

    fetchProduct();
  }, [id]);

  const cartItems = useSelector(selectCartItemsByType(product?.id as number, activeType as number));
  const count = calcTotalCount(cartItems);

  useEffect(() => {
    setItemCount(count);
  }, [activeType]);

  const onCountClickHandler = (add: boolean) => {
    const countCond = add ? itemCount < 99 && count < 99 : itemCount > 0 && count > 0;

    if (product && countCond) {
      const item: CartProduct = {
        id: product.id,
        title: product.title,
        price: product.price[activeType as number],
        imageUrl: product.imageUrl,
        types: activeType as number,
        count: 0,
      };

      if (add) {
        setItemCount(itemCount + 1);
        dispatch(addItem(item));
      } else {
        setItemCount(itemCount - 1);
        dispatch(minusItem(item));
      }
    }
  };

  // const onMinusClickHandler = () => {
  //   if (product && itemCount > 0 && count > 0) {
  //     setItemCount(itemCount - 1);
  //
  //     const item: CartProduct = {
  //       id: product.id,
  //       title: product.title,
  //       price: product.price[activeType as number],
  //       imageUrl: product.imageUrl,
  //       types: activeType as number,
  //       count: 0,
  //     };
  //
  //     dispatch(minusItem(item));
  //   }
  // };

  return (
      <div className='container'>
        {
            isPopupOpen &&
            <Popup setIsPopupOpen={setIsPopupOpen} isPopupOpen={isPopupOpen} confirmText='Хорошо'
                   confirmActionClickHandler={() => navigate('/')}
                   text={<p>К сожалению, <span>не удалось</span> получить данные. Попробуйте повторить попытку позже.
                   </p>} />
        }
        {
          !product
              ? <h2 className='loading'>Загрузка...</h2>
              : <div className='full-product'>
                <div className='full-product-block'>
                  <Link to='/' className='button button--black'>
                    <span>Вернуться назад</span>
                  </Link>

                  <Link to={`/?sortProperty=rating&categoryId=${product.category}&currentPage=1`}>
                    <p className='full-product__category'>{CategoriesList[product.category]}</p></Link>
                  <img className='product-block__image'
                       src={images[product.imageUrl]}
                       alt={product.title} />
                  <h2>{product.title}</h2>
                  <p className='full-product__description'>{`Состав: ${product.composition}`}</p>


                  <div className='product-block__selector full-product__selector'>
                    <ul>
                      {
                        product.types.map((type: number, idx: number) => <li key={idx} onClick={() => setActiveType(type)}
                                                                             className={activeType === type ? 'active' :
                                                                                 ''}>{typeNames[type]}</li>)
                      }
                    </ul>
                  </div>

                  <div className='product-block__bottom full-product__bottom'>
                    <div className='product-block__price full-product__price'>{product.price[activeType as number]}&nbsp;₽
                    </div>

                    <div className='cart__item-count full-product__count'>
                      <button onClick={() => onCountClickHandler(false)}
                              className='button button--outline button--circle cart__item-count-minus'>
                        <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                              d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                              fill='#EB5A1E' />
                          <path
                              d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                              fill='#EB5A1E' />
                        </svg>

                      </button>
                      <b>{count}</b>
                      <button onClick={() => onCountClickHandler(true)}
                              className='button button--outline button--circle cart__item-count-plus'>
                        <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                              d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                              fill='#EB5A1E' />
                          <path
                              d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                              fill='#EB5A1E' />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        }
      </div>
  )
};

export default FullProduct;
