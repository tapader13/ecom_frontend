import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
interface Color {
  color: string;
  hex: string;
  fakeImg: string;
}
export interface CartItem {
  price: number | undefined;
  quantity: number;
  size: string | undefined;
  color: Color | undefined;
  title: string | undefined;
  id: number | undefined;
  img: string | undefined;
  category: string | undefined;
}
export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },
    updateQtyToCart: (state, action: PayloadAction<CartItem>) => {
      const findItemIndex = state.cart.findIndex(
        (crt) =>
          crt.id === action.payload.id &&
          crt.size === action.payload.size &&
          crt.color?.color === action.payload.color?.color
      );
      if (findItemIndex !== -1) {
        state.cart[findItemIndex] = {
          ...state.cart[findItemIndex],
          quantity: action.payload.quantity,
        };
      }
    },
    deleteCart: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.filter(
        (crt) =>
          crt.id !== action.payload.id ||
          crt.size !== action.payload.size ||
          crt.color?.color !== action.payload.color?.color
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});
export const { addToCart, updateQtyToCart, deleteCart,clearCart } = cartSlice.actions;
export const getCart = (state: RootState) => state.cart.cart;
export default cartSlice.reducer;
