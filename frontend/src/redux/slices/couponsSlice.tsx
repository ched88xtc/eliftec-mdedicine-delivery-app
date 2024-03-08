import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface ICoupon {
  _id: string;
  code: string;
  discount: number;
}

export interface ICouponsState {
  coupons: {
    items: ICoupon[],
    status: "idle" | "loading" | "loaded" | "error";
  }
}

export const fetchCoupons = createAsyncThunk('coupons/fetchCoupons', async () => {
  const res = await axios.get(`/coupons`);
  
  return res.data as ICoupon[];
});

const initialState: ICouponsState = {
  coupons: {
    items: [],
    status: 'loading',
  }
};

const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.coupons.items = [];
        state.coupons.status = 'loading';
      })
      .addCase(fetchCoupons.fulfilled, (state, action: PayloadAction<ICoupon[]>) => {
        state.coupons.items = action.payload;
        state.coupons.status = 'loaded';
      })
      .addCase(fetchCoupons.rejected, (state) => {
        state.coupons.items = [];
        state.coupons.status = 'error';
      });
  },
})

export const couponsReducer = couponsSlice.reducer;
