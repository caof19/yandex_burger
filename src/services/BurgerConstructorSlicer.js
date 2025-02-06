import { createSlice } from '@reduxjs/toolkit'

export const BurgerConstructorSlice = createSlice({
  name: 'BurgerConstructor',
  initialState: {
    main: [],
    bun: {}
  },
  reducers: {
    changeBun: (state, action) => {
      state.bun = action.payload.bun;
    },
    addIngredientToMenu: (state, action) => {
      const {item:product} = action.payload;

      if (!state.bun || Object.keys(state.bun).length === 0) {
        return;
      }

      state.main.push({
        ...product,
        mainOrder: state.main.length,
        type: 'main',
      });
    },
    removeIngredient: (state, action) => {
      const { id } = action.payload;

      state.main = state.main.filter(ingredient => ingredient.mainOrder !== id)
    },
    reorderIngredients: (state, action) => {
      const { id, replaceToId } = action.payload;

      const element = state.main.splice(id, 1)[0];
      state.main.splice(replaceToId, 0, element);
    }
  }
})

export const {changeBun, addIngredientToMenu, removeIngredient, reorderIngredients} = BurgerConstructorSlice.actions;

export default BurgerConstructorSlice.reducer;