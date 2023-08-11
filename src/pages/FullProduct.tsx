import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Popup } from '../components';

import { CategoriesList, ServerURL } from '../consts';
import images from '../assets/img';
import { Product } from '../types';

export const FullProduct = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [product, setProduct] = useState<Product>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${ServerURL}/${id}`);
        setProduct(data);
      } catch (err) {
        setIsPopupOpen(true);
      }
    }

    fetchProduct();
  }, [id]);

  // TODO - description, composition, add to cart buttons can be added
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
              : <div className='full-product-block'>
                <Link to={`/?sortProperty=rating&categoryId=${product.category}&currentPage=1`}>
                  <p>{CategoriesList[product.category]}</p></Link>
                <img className='pizza-block__image'
                     src={images[product.imageUrl]}
                     alt={product.title} />
                <h2>{product.title}</h2>
                <p>{product.price} ₽</p>
              </div>
        }
      </div>
  )
};
