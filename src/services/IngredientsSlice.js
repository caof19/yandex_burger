import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {BASE_URL} from "../utils/const.js";
import {checkResponse} from "../utils/network.js";

export const IngredientsSlice = createSlice({
  name: 'Ingredients',
  initialState: {
    isLoad: false,
    isError: false,
    ingredients: [],
  },
  reducers: {
    useIngredient: (state, action) => {
      const { id } = action.payload;

      const product = state.ingredients.find(ingredient => ingredient._id === id);
      if(product) {
        if(product.current === undefined) {
          product.current = 0;
        }

        product.current += 1;
      }
    },
    unUseIngredient: (state, action) => {
      const { id } = action.payload;

      const product = state.ingredients.find(ingredient => ingredient._id === id);
      if(product) {
        if(product.current > 0) {
          product.current -= 1;
        }
      }
    },
    resetIngredient: (state, action) => {
      const { id } = action.payload;

      const product = state.ingredients.find(ingredient => ingredient._id === id);
      if(product) {
          product.current = 0;
      }
    },
    resetAllIngredients: (state, action) => {
      const product = state.ingredients.map(ingredient => {
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
        state.isError = null;

        state.ingredients = action.payload.data;
      })
      // Вызывается в случае ошибки
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoad = false;
        state.isError = true;
      });
  },
})

export const fetchIngredients = createAsyncThunk(
  'Ingredients/fetchIngredients',
  async (dispatch, {rejectWithValue}) => {
    try {
      return await fetch(BASE_URL+"/ingredients").then(checkResponse);

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const {useIngredient, unUseIngredient, resetIngredient,  resetAllIngredients} = IngredientsSlice.actions;

export default IngredientsSlice.reducer;