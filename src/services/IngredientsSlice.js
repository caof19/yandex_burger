import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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
      const response = await fetch("https://norma.nomoreparties.space/api/ingredients");

      if (!response.ok) throw new Error("Ошибка загрузки данных");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const {useIngredient, unUseIngredient, resetIngredient} = IngredientsSlice.actions;

export default IngredientsSlice.reducer;