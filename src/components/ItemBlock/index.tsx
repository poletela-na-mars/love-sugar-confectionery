import { useState } from 'react';
import images from '../../assets/img';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem, selectCartItemById } from '../../redux/slices/cartSlice';

import { typeNames } from '../../consts';
import { Product } from '../../types';

// TODO - extract to type file
//      - change font
//      - add '-' to decrease amount of product

export const ItemBlock = (props: Product) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(props.id));
  const count = cartItem ? cartItem.count : 0;

  const [itemCount, setItemCount] = useState(0);
  const [activeType, setActiveType] = useState(props.types[0]);

  const onClickAddButtonHandler = () => {
    if (itemCount < 99) {
      setItemCount(itemCount + 1);
    }

    const item = {
      id: props.id,
      title: props.title,
      price: props.price,
      imageUrl: props.imageUrl,
      types: typeNames[activeType],
    };
    dispatch(addItem(item));
  };

  return (
      <div className='item-block-wrapper'>
        <div className='pizza-block'>
          <Link to={`/product/${props.id}`} key={props.id}>
            <img
                className='pizza-block__image'
                src={images[props.imageUrl]}
                alt={props.title}
            />
            <h4 className='pizza-block__title'>{props.title}</h4>
          </Link>
          <div className='pizza-block__selector'>
            <ul>
              {
                props.types.map((type: number, idx: number) => <li key={idx} onClick={() => setActiveType(type)}
                                                                   className={activeType === type ? 'active' :
                                                                       ''}>{typeNames[type]}</li>)
              }
            </ul>
          </div>
          <div className='pizza-block__bottom'>
            <div className='pizza-block__price'>от {props.price} ₽</div>
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
              {count > 0 && <i>{count}</i>}
            </button>
          </div>
        </div>
      </div>
  );
};
