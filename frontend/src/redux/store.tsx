import { configureStore } from "@reduxjs/toolkit";
import { shopsReducer } from "./slices/shops";
import { medicationsReducer } from "./slices/medications";
import { cartReducer } from "./slices/cart";
import { ordersReducer } from "./slices/orders";
import { couponsReducer } from "./slices/couponsSlice";


const store = configureStore({
  reducer: {
    shops: shopsReducer,
    medications: medicationsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    coupons: couponsReducer,
  },
})

export default store;
export type AppDispatch = typeof store.dispatch;
