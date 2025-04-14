import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TFeedDetail} from "../utils/types.ts";
import {BASE_URL} from "../utils/const.ts";
import {checkResponse} from "../utils/network.ts";

export const initialState: TFeedDetail = {
    info: {
        number: 0,
        name: '',
        status: '',
        date: '',
        ingredients: [
            ''
        ],
        formatIngredients: [{
            img: 'https://code.s3.yandex.net/react/code/bun-01.png',
            price: 0,
            count: 0,
        }
        ]
    }
}

const FeedDetailSlice = createSlice({
    name: 'FeedDetail',
    initialState,
    reducers: {
        setFormatedIngredients: (state, action) => {
            state.info.formatIngredients = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.fulfilled, (state, action) => {
                const {name, createdAt, status, number, ingredients} = action.payload.orders[0];
                let statusRus = '';

                switch (status) {
                    case 'created':
                        statusRus = 'Создан'
                        break;
                    case 'pending':
                        statusRus = 'Готовится'
                        break;
                    case 'done':
                        statusRus = 'Выполнен'
                        break;
                }
                state.info = {
                    name,
                    number,
                    ingredients,
                    date: createdAt,
                    status: statusRus,
                }
            })
    },
})

export const fetchOrder = createAsyncThunk(
    'OrderDetails/FeedDetail',
    async (orderId: number, {rejectWithValue}) => {
        try {

            return await fetch(BASE_URL + "/orders/" + orderId, {
                method: "GET",
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

export const {setFormatedIngredients} = FeedDetailSlice.actions;

export default FeedDetailSlice.reducer;