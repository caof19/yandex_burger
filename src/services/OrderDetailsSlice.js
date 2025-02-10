import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {BASE_URL} from "../utils/const.js";
import {checkResponse} from "../utils/network.js";


const initialState = {
    modalInfo: {
      isActiveOrderDetail: false,
      orderNum: 0,
    }
  };
export const OrderDetailsSlice = createSlice({
  name: 'OrderDetails',
  initialState,
  reducers: {
    closeOrderModal: (state, action) => {
      state.modalInfo = initialState.modalInfo
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {

      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        const orderNum = action.payload.order.number;
        state.modalInfo = {
          isActiveOrderDetail: true,
          orderNum
        }


      })
      .addCase(fetchOrder.rejected, (state, action) => {

      });
  },
})

export const fetchOrder = createAsyncThunk(
  'OrderDetails/fetchOrder',
  async (orderData, {rejectWithValue}) => {
    try {
      return await fetch(BASE_URL+"/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }).then(checkResponse);

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const {openModal, closeOrderModal} = OrderDetailsSlice.actions;

export default OrderDetailsSlice.reducer;