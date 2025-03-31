import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TFeed} from "../utils/types.ts";

export const chatWSActions = {
    connect: 'HistoryList/connect',
    disconnect: 'HistoryList/disconnect',
    onMessage: 'HistoryList/onMessage',
};


const initialState: TFeed = {
    total: 0,
    today: 0,
    ordersList: [
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
    ],
    successId: [0],
    inProgressId: [0],
};

const HistoryList = createSlice({
    name: 'HistoryList',
    initialState,
    reducers: {
        connect(state, action: PayloadAction<{ url: string; token?: string }>) {
            console.log({state, action})
        },
        onMessage(state, action) {
            const {total, today, successId, inProgressId, orders} = action.payload;

            state.total = total;
            state.today = today;
            state.successId = successId.slice(0, 10);
            state.inProgressId = inProgressId.slice(0, 10);
            state.ordersList = orders;
        },
        disconnect() {
        },
    },
});

export const {connect, disconnect} = HistoryList.actions;
export default HistoryList.reducer;