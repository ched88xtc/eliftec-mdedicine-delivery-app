import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

interface IShop {
  id: string
  name: string
}

export interface IShopsState {
  shops: {
    items: IShop[];
    status: 'loading' | 'loaded' | 'error';
  }
}

const initialState: IShopsState = {
  shops: {
    items: [],
    status: 'loading',
  }
};

export const fetchShops = createAsyncThunk<IShop[], void>('shops/fetchShops', async () => {
  const res = await axios.get('/drugstores');
  return res.data;
});

const shopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, (state) => {
        state.shops.items = [];
        state.shops.status = 'loading';
      })
      .addCase(fetchShops.fulfilled, (state, action: PayloadAction<IShop[]>) => {
        state.shops.items = action.payload;
        state.shops.status = 'loaded';
      })
      .addCase(fetchShops.rejected, (state) => {
        state.shops.items = [];
        state.shops.status = 'error';
      });
  },
});

export const shopsReducer = shopsSlice.reducer;