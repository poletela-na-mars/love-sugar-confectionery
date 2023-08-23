import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Popup } from '../components';

afterEach(() => {
  cleanup();
})

describe('Pages Tests', () => {
  describe('Cart Test', () => {
    const mockFun = jest.fn();
    const setIsPopupOpen = jest.fn();

    const text = 'Вы действительно хотите удалить все товары из корзины?';

    render(<Popup confirmActionClickHandler={mockFun} setIsPopupOpen={setIsPopupOpen}
                  isPopupOpen={true} confirmText='Да' cancelText='Нет'
                  text={<p>Вы действительно хотите <span>удалить</span> все товары из корзины?</p>} />);

    const popup = screen.getByTestId('popup');

    test('Popup Rendering', () => {
      expect(popup).toBeInTheDocument();
    });

    test('Popup Text', () => {
      expect(popup).toHaveTextContent(text);
    });

    test('Popup Close', () => {
      const closeButton = screen.getByTestId('close-button');
      expect(closeButton).toBeInTheDocument();
      fireEvent.click(closeButton);
      expect(setIsPopupOpen).toBeCalled();
    });
  });
});
