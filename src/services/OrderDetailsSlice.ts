import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {BASE_URL} from "../utils/const";
import {checkResponse} from "../utils/network";


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
        closeOrderModal: (state) => {
            state.modalInfo = initialState.modalInfo
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, () => {

            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                const orderNum = action.payload.order.number;
                state.modalInfo = {
                    isActiveOrderDetail: true,
                    orderNum
                }


            })
            .addCase(fetchOrder.rejected, () => {

            });
    },
})

export const fetchOrder = createAsyncThunk(
    'OrderDetails/fetchOrder',
    async (orderData: { ingredients: string[] }, {rejectWithValue}) => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (accessToken) {
                headers['Authorization'] = accessToken;
            }

            return await fetch(BASE_URL + "/orders", {
                method: "POST",
                headers,
                body: JSON.stringify(orderData),
            }).then(checkResponse);

        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
)

export const {closeOrderModal} = OrderDetailsSlice.actions;

export default OrderDetailsSlice.reducer;