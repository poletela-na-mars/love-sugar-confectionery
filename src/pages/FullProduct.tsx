import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { CategoriesList } from '../consts';
import images from '../assets/img';
import { Product } from '../types';

export const FullProduct = () => {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`https://648e2e662de8d0ea11e89b74.mockapi.io/items/${id}`);
        setProduct(data);
      } catch (err) {
        // TODO - popup
        alert('Ошибка при получении продукта.');
        navigate('/');
      }
    }

    fetchProduct();
  }, []);

  if (!product) {
    return (
        <div className='container'>
          <h2 className='loading'>Загрузка...</h2>
        </div>
    );
  }

  // TODO - description, composition, add to cart buttons can be added
  return (
      <div className='container'>
        <div className='full-product-block'>
          <Link to={`/?sortProperty=rating&categoryId=${product.category}&currentPage=1`}>
            <p>{CategoriesList[product.category]}</p></Link>
          <img className='pizza-block__image'
               src={images[product.imageUrl]}
               alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.price} ₽</p>
        </div>
      </div>
  )
};
