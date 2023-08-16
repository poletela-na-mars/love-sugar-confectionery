import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Popup } from '../components';

import { CategoriesList, ServerURL, typeNames } from '../consts';
import images from '../assets/img';
import { CartProduct, Product } from '../types';
import { addItem } from '../redux/cart/slice';

import { selectCartItemsById } from '../redux/cart/selectors';
import { calcTotalCount } from '../utils/calcTotalCount';

export const FullProduct = () => {
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
        const { data } = await axios.get(`${ServerURL}/${id}`);
        setProduct(data);
        setActiveType(data.types[0]);
      } catch (err) {
        setIsPopupOpen(true);
      }
    }

    fetchProduct();
  }, [id]);

  const cartItems = useSelector(selectCartItemsById(product?.id as number));
  const count = calcTotalCount(cartItems);

  const onClickAddButtonHandler = () => {
    if (product && itemCount < 99) {
      setItemCount(itemCount + 1);

      const item: CartProduct = {
        id: product.id,
        title: product.title,
        price: product.price[activeType as number],
        imageUrl: product.imageUrl,
        types: activeType as number,
        count: 0,
      };

      dispatch(addItem(item));
    }
  };

  // TODO - ?description
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
                  <img className='pizza-block__image'
                       src={images[product.imageUrl]}
                       alt={product.title} />
                  <h2>{product.title}</h2>
                  <p className='full-product__description'>{`Состав: ${product.composition}`}</p>


                  <div className='pizza-block__selector full-product__selector'>
                    <ul>
                      {
                        product.types.map((type: number, idx: number) => <li key={idx} onClick={() => setActiveType(type)}
                                                                             className={activeType === type ? 'active' :
                                                                                 ''}>{typeNames[type]}</li>)
                      }
                    </ul>
                  </div>
                  <div className='pizza-block__bottom'>
                    <div className='pizza-block__price'>{product.price[activeType as number]}&nbsp;₽</div>
                    <button onClick={onClickAddButtonHandler}
                            className='button button--outline button--add full-product__button-add'>
                      <svg
                          width='12'
                          height='12'
                          viewBox='0 0 12 12'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                            d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                            fill='white'
                        />
                      </svg>
                      {/*<span>Добавить</span>*/}
                      {count > 0 && <b>{count}</b>}
                    </button>
                  </div>
                </div>
              </div>
        }
      </div>
  )
};
