import { useEffect, useState } from 'react';
import images from '../../assets/img';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem } from '../../redux/cart/slice';
import { selectCartItemsById } from '../../redux/cart/selectors';
import { calcTotalCount } from '../../utils/calcTotalCount';

import { typeNames } from '../../consts';
import { CartProduct, Product } from '../../types';

export const ItemBlock = ({ id, title, price, imageUrl, types }: Product) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItemsById(id));

  const count = calcTotalCount(cartItems);

  const [itemCount, setItemCount] = useState(0);
  const [activeType, setActiveType] = useState(types[0]);

  useEffect(() => {
    setItemCount(count);
  }, []);

  const onClickAddButtonHandler = () => {
    if (itemCount < 99 && count < 99) {
      setItemCount(itemCount + 1);

      const item: CartProduct = {
        id,
        title,
        price: price[activeType],
        imageUrl,
        types: activeType,
        count: 0,
      };

      dispatch(addItem(item));
    }
  };

  return (
      <div className='item-block-wrapper'>
        <div className='product-block'>
          <Link to={`/product/${id}`} key={id}>
            <img
                className='product-block__image'
                src={images[imageUrl]}
                alt={title}
            />
            <h4 className='product-block__title'>{title}</h4>
          </Link>
          <div className='product-block__selector'>
            <ul>
              {
                types.map((type: number, idx: number) => <li key={idx} onClick={() => setActiveType(type)}
                                                             className={activeType === type ? 'active' :
                                                                 ''}>{typeNames[type]}</li>)
              }
            </ul>
          </div>
          <div className='product-block__bottom'>
            <div className='product-block__price'>{price[activeType]}&nbsp;₽</div>
            <button onClick={onClickAddButtonHandler} className='button button--outline button--add'>
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
              <span>Добавить</span>
              {count > 0 && <b>{count}</b>}
            </button>
          </div>
        </div>
      </div>
  );
};
