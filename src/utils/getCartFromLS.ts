import { calcTotalPrice } from './calcTotalPrice';
import { CartProduct } from '../types';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartProduct[],
    totalPrice,
  }
};
