import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDataFromLS } from "../../helpers/getDataFromLS";

export interface ICartItem {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  count: number;
  isFavorite: boolean;
}

export interface ICartState {
  cart: {
    items: ICartItem[];
    totalPrice: number;
    priceBeforeDiscount: number;
  };
}

const initialState: ICartState = {
  cart: {
    items: getDataFromLS("cartItems", "array"),
    totalPrice: getDataFromLS("totalPrice", "number"),
    priceBeforeDiscount: getDataFromLS("priceBeforeDiscount", "number"),
  },
};

const saveToLS = (
  items: ICartItem[],
  price: number,
  priceBeforeDiscount: number
) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
  localStorage.setItem("totalPrice", JSON.stringify(price));
  localStorage.setItem(
    "priceBeforeDiscount",
    JSON.stringify(priceBeforeDiscount)
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ICartItem>) {
      const foundItem = state.cart.items.find(
        (el) => el.id === action.payload.id
      );

      if (foundItem) {
        const updatedItem: ICartItem = {
          ...foundItem,
          price: foundItem.price + +action.payload.price / foundItem.count,
          count: foundItem.count + 1,
        };

        const idx = state.cart.items.findIndex(
          (el) => el.id === action.payload.id
        );

        state.cart.totalPrice =
          state.cart.totalPrice + +action.payload.price / foundItem.count;

        state.cart.items.splice(idx, 1, updatedItem);

        saveToLS(
          state.cart.items,
          state.cart.totalPrice,
          state.cart.priceBeforeDiscount
        );

        return;
      }

      state.cart.totalPrice = state.cart.totalPrice + +action.payload.price;

      state.cart.items.push(action.payload);

      saveToLS(
        state.cart.items,
        state.cart.totalPrice,
        state.cart.priceBeforeDiscount
      );
    },
    removeProduct(state, action: PayloadAction<ICartItem>) {
      const foundItem = state.cart.items.find(
        (el) => el.id === action.payload.id
      );

      if (foundItem && foundItem.count > 1) {
        const updatedItem: ICartItem = {
          ...foundItem,
          price: +foundItem.price - +action.payload.price / foundItem.count,
          count: foundItem.count - 1,
        };

        const idx = state.cart.items.findIndex(
          (el) => el.id === action.payload.id
        );

        state.cart.totalPrice =
          state.cart.totalPrice - +action.payload.price / foundItem.count;

        state.cart.items.splice(idx, 1, updatedItem);

        saveToLS(
          state.cart.items,
          state.cart.totalPrice,
          state.cart.priceBeforeDiscount
        );

        return;
      }

      state.cart.totalPrice = state.cart.totalPrice - +action.payload.price;

      state.cart.items = state.cart.items.filter(
        (el) => el.id !== action.payload.id
      );

      saveToLS(
        state.cart.items,
        state.cart.totalPrice,
        state.cart.priceBeforeDiscount
      );
    },
    removeAllProduct(state, action: PayloadAction<ICartItem>) {
      const foundItem = state.cart.items.find(
        (el) => el.id === action.payload.id
      );

      if (foundItem) {
        state.cart.totalPrice = state.cart.totalPrice - +foundItem.price;
        state.cart.items = state.cart.items.filter(
          (el) => el.id !== action.payload.id
        );
      }

      saveToLS(
        state.cart.items,
        state.cart.totalPrice,
        state.cart.priceBeforeDiscount
      );
    },
    clearCart(state) {
      state.cart.items = [];
      state.cart.totalPrice = 0;

      saveToLS([], 0, 0);
    },
    applyDiscount(state, action: PayloadAction<number>) {
      const defaultPrice = state.cart.totalPrice;
      const discountPercentage = action.payload / 100;
      const discountedPrice = state.cart.totalPrice * (1 - discountPercentage);

      state.cart.totalPrice = discountedPrice;
      state.cart.priceBeforeDiscount = defaultPrice;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  removeAllProduct,
  clearCart,
  applyDiscount,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
