import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {BASE_URL} from "../utils/const";
import {checkResponse} from "../utils/network";
import {TIngredients} from "../utils/types";

export const initialState : TIngredients = {
    isLoad: false,
    isError: false,
    ingredients: [],
}
export const IngredientsSlice = createSlice({
    name: 'Ingredients',
    initialState,
    reducers: {
        useIngredient: (state, action) => {
            const {id} = action.payload;

            const product = state.ingredients.find(ingredient => ingredient._id === id);
            if (product) {
                if (product.current === undefined) {
                    product.current = 0;
                }

                product.current += 1;
            }
        },
        unUseIngredient: (state, action) => {
            const {id} = action.payload;

            const product = state.ingredients.find(ingredient => ingredient._id === id);
            if (product) {
                if (product.current === undefined) {
                    product.current = 0;
                }
                if (product.current > 0) {
                    product.current -= 1;
                }
            }
        },
        resetIngredient: (state, action) => {
            const {id} = action.payload;

            const product = state.ingredients.find(ingredient => ingredient._id === id);
            if (product) {
                product.current = 0;
            }
        },
        resetAllIngredients: (state) => {
            state.ingredients.map(ingredient => {
                ingredient.current = 0

                return ingredient;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.isLoad = true;
                state.isError = false;
            })
            // Вызывается, если запрос успешно выполнился
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.isLoad = false;
                state.isError = false;

                state.ingredients = action.payload.data;
            })
            // Вызывается в случае ошибки
            .addCase(fetchIngredients.rejected, (state) => {
                state.isLoad = false;
                state.isError = true;
            });
    },
})

export const fetchIngredients = createAsyncThunk(
    'Ingredients/fetchIngredients',
    async (_, {rejectWithValue, getState}) => {
        try {

            const state = getState() as { Ingredients: TIngredients };

            if (state.Ingredients.ingredients.length > 0) {
                return {data: state.Ingredients.ingredients};
            } else {
                return await fetch(BASE_URL + "/ingredients").then(checkResponse);
            }

        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
)

export const {useIngredient, unUseIngredient, resetIngredient, resetAllIngredients} = IngredientsSlice.actions;

export default IngredientsSlice.reducer;