import productsSlice, { setProducts } from './slice';
import { ProductsState } from './types';
import { Status } from '../../consts';
import { Product } from '../../types';

let initialState: ProductsState = {
  products: [],
  status: Status.LOADING,
};

let mockProducts: Product[] =
    [{
      id: 0,
      imageUrl: 'bread',
      title: 'Хлеб Чиабатта',
      types: [
        1,
        3
      ],
      price: {
        1: 79,
        3: 130
      },
      category: 4,
      rating: 7,
      composition: 'Мука пшеничная хлебопекарная высшего сорта, вода питьевая, пшеничная закваска (вода питьевая, мука пшеничная хлебопекарная высшего сорта), молоко питьевое ультрапастеризованное м.д.ж. 3,2%, соль пищевая, дрожжи хлебопекарные прессованные'
    },
      {
        id: 1,
        imageUrl: 'brownie',
        title: 'Брауни',
        types: [
          0
        ],
        price: {
          0: 89
        },
        category: 2,
        rating: 6,
        composition: 'Шоколад (какао тертое, сахар, какао-масло, эмульгатор лецитин), яичный меланж, сахар, масло сливочное, мука высший сорт, соль'
      },
    ];

describe('Products reducers', () => {
  describe('setProducts', () => {
    it('should set products successfully', () => {
      expect(productsSlice(initialState, setProducts(mockProducts)).products)
          .toEqual(mockProducts);
      expect(initialState.status)
          .toEqual(Status.SUCCESS);
    });
  });
});
