import cartSlice, { addItem, clearItems, minusItem, removeItem } from './slice';
import { CartState } from './types';
import { CartProduct } from '../../types';

let initialState: CartState;

let mockProduct: CartProduct = {
  id: 2,
  imageUrl: "carrotCake",
  title: "Морковный торт",
  types: 2,
  price: 99,
  count: 1,
};

describe('Cart reducers', () => {
  describe('addItem', () => {
    beforeEach(() => {
      initialState = {
        totalPrice: 198,
        items: [{
          id: 2,
          imageUrl: "carrotCake",
          title: "Морковный торт",
          types: 2,
          price: 99,
          count: 2,
        }],
      };
    });

    it('should increase totalPrice, when adding an item', () => {
      const increasedTotalPrice = initialState.totalPrice + mockProduct.price;
      expect(cartSlice(initialState, addItem(mockProduct)).totalPrice)
          .toEqual(increasedTotalPrice);
    });

    it('should increment count, when adding an item', () => {
      const increasedCount = initialState.items[0].count + 1;
      expect(cartSlice(initialState, addItem(mockProduct)).items[0].count)
          .toEqual(increasedCount);
    });
  });

  describe('removeItem', () => {
    beforeEach(() => {
      initialState = {
        totalPrice: 1796,
        items: [{
          id: 2,
          imageUrl: "carrotCake",
          title: "Морковный торт",
          types: 2,
          price: 99,
          count: 2,
        },
          {
            id: 2,
            imageUrl: "carrotCake",
            title: "Морковный торт",
            types: 3,
            price: 799,
            count: 2,
          }
        ],
      };
    });

    it('should decrease totalPrice, when removing an item (of a certain type)', () => {
      const decreasedTotalPrice = initialState.totalPrice - (initialState.items[0].price * initialState.items[0].count);
      expect(cartSlice(initialState, removeItem(mockProduct)).totalPrice)
          .toEqual(decreasedTotalPrice);
    });

    it('should decrease the length of items[] (a certain type of an item), when removing', () => {
      const totalCount = initialState.items.length - 1;
      expect(cartSlice(initialState, removeItem(mockProduct)).items.length)
          .toEqual(totalCount);
    });
  });

  describe('minusItem', () => {
    beforeEach(() => {
      initialState = {
        totalPrice: 198,
        items: [{
          id: 2,
          imageUrl: "carrotCake",
          title: "Морковный торт",
          types: 2,
          price: 99,
          count: 2,
        }],
      };
    });

    it('should decrease totalPrice, when removing one item', () => {
      const decreasedTotalPrice = initialState.totalPrice - mockProduct.price;
      expect(cartSlice(initialState, minusItem(mockProduct)).totalPrice)
          .toEqual(decreasedTotalPrice);
    });

    it('should decrement count, when removing one item', () => {
      const decreasedCount = initialState.items[0].count - 1;
      expect(cartSlice(initialState, minusItem(mockProduct)).items[0].count)
          .toEqual(decreasedCount);
    });
  });

  describe('clearItems', () => {
    beforeEach(() => {
      initialState = {
        totalPrice: 198,
        items: [{
          id: 2,
          imageUrl: "carrotCake",
          title: "Морковный торт",
          types: 2,
          price: 99,
          count: 2,
        }],
      };
    });

    it('should reset to zero totalPrice, when clear items', () => {
      const zeroedTotalPrice = 0;
      expect(cartSlice(initialState, clearItems()).totalPrice)
          .toEqual(zeroedTotalPrice);
    });

    it('should reset to zero the length of items[], when clear items', () => {
      const zeroedItemsLen = 0;
      expect(cartSlice(initialState, clearItems()).items.length)
          .toEqual(zeroedItemsLen);
    });
  });
});
