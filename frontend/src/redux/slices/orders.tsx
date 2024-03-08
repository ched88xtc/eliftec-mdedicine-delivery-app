import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

interface IOrder {
  id: string;
  phone: string;
  email: string;
  address: string;
  totalPrice: number;
  createdAt: string;
}

export interface IOrdersState {
  orders: {
    items: IOrder[];
    status: 'loading' | 'loaded' | 'error';
  }
}

interface GetOrdersPayload {
  value: {
    phone?: string;
    email?: string;
    id?: string;
  };
  getBy: string;
}

export const getOrdersBy = createAsyncThunk<IOrder[], GetOrdersPayload>(
  'orders/getOrdersBy',
  async ({ value, getBy }) => {
    if (getBy === "phone") {
      const res = await axios.get(`/orders/phone/${value.phone}`);
      return res.data;
    }

    if (getBy === "email") {
      const res = await axios.get(`/orders/email/${value.email}`);
      return res.data;
    }

    if (getBy === "id") {
      const res = await axios.get(`/orders/${value.id}`);
      return res.data;
    }

    throw new Error("Invalid 'getBy' value");
  }
);

const initialState: IOrdersState = {
  orders: {
    items: [],
    status: 'loading',
  }
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersBy.pending, (state) => {
        state.orders.items = [];
        state.orders.status = 'loading';
      })
      .addCase(getOrdersBy.fulfilled, (state, action) => {
        state.orders.items = action.payload;
        state.orders.status = 'loaded';
      })
      .addCase(getOrdersBy.rejected, (state) => {
        state.orders.items = [];
        state.orders.status = 'error';
      });
  },
});

export const ordersReducer = ordersSlice.reducer;