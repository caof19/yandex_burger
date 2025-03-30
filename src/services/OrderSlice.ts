import {TOrders} from "../utils/types.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState: TOrders = {
    orders: [
        {
            _id: '',
            number: 0,
            name: '',
            createdAt: '',
            date: '',
            ingredients: [
                {
                    price: 0,
                    img: ''
                }
            ]
        }
    ]
}

export const OrderSlice = createSlice({
    name: 'Feed',
    initialState,
    reducers: {
        setOrdersInfo: (state, action) => {
            state.orders = action.payload.orders;
        }
    }
})

export const {
    setOrdersInfo
} = OrderSlice.actions;

export default OrderSlice.reducer;