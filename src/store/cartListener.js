import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addToCart, removeFromCart, clearCart, updateFilters } from './productSlice';
import { saveFullCart, clearAllItemsCart, setFilters } from '../utils/localStorageHelpers';

export const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  matcher: isAnyOf(addToCart, removeFromCart, clearCart),
  effect: async (action, listenerApi) => {
    const cartState = listenerApi.getState().products.cart;
    if (action.type === clearCart.type) {
      clearAllItemsCart();
    } else {
      saveFullCart(cartState);
    }
  },
});

cartListenerMiddleware.startListening({
  actionCreator: updateFilters,
  effect: async (action, listenerApi) => {
    const filtersState = listenerApi.getState().products.filters;
    setFilters(filtersState);
  },
});
