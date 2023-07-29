import { Link } from 'react-router-dom';
import emptyCartImg from './../../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
      <div className='cart cart--empty'>
        <h2>Корзина пустая</h2>
        <p>
          Чтобы заказать нашу великолепную продукцию, перейдите на главную страницу.
        </p>
        <img src={emptyCartImg} alt='Empty cart' />
        <Link to='/' className='button button--black'>
          <span>Вернуться назад</span>
        </Link>
      </div>
  );
}
