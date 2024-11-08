import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : undefined;
  } catch (error) {
    console.error("Error loading cart from local storage:", error);
    return undefined;
  }
};

const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  } catch (error) {
    console.error("Error saving cart to local storage:", error);
  }
};

const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState: loadCartFromLocalStorage(),
});

store.subscribe(() => saveCartToLocalStorage(store.getState()));

export default store;
