import {TFeed} from "../utils/types.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState : TFeed = {
    orders: {
        total: 0,
        today: 0,
        info: [
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
    },
    successId: [0],
    inProgressId: [0],
}

export const FeedSlice = createSlice({
    name: 'Feed',
    initialState,
    reducers: {
        setTotal: (state,action) => {
            state.orders.total = action.payload.total;
        },
        setToday: (state,action) => {
            state.orders.today = action.payload.today;
        },
        setSuccess: (state, action) => {
            state.successId = action.payload.successId.slice(0,10);
        },
        setInProgress: (state, action) => {
            state.inProgressId = action.payload.inProgressId.slice(0,10);
        },
        setOrdersInfo: (state, action) => {
            state.orders.info = action.payload.orders;
        }
    }
})

export const {
    setTotal,
    setToday,
    setSuccess,
    setInProgress,
    setOrdersInfo
} = FeedSlice.actions;

export default FeedSlice.reducer;