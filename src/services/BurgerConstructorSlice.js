import {createSlice, nanoid} from '@reduxjs/toolkit'

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
    addIngredientToMenu: {
      reducer: (state, action) => {
        const {product} = action.payload;

        if (!state.bun || Object.keys(state.bun).length === 0) {
          return;
        }

        state.main.push(product);
      },
      prepare: ({item}) => {
        return {
          payload: {
            product: {
              ...item,
              mainId: nanoid(),
              type: 'main',
            }
          }
        };
      }
    },
    removeIngredient: (state, action) => {
      const { id } = action.payload;

      state.main = state.main.filter(ingredient => ingredient.mainId !== id)
    },
    reorderIngredients: (state, action) => {
      const { id, replaceToId } = action.payload;

      const element = state.main.splice(id, 1)[0];
      state.main.splice(replaceToId, 0, element);
    },
    clearCart: (state) => {
      state.main = [];
      state.bun = {};
    }
  }
})

export const {changeBun, addIngredientToMenu, removeIngredient, reorderIngredients, clearCart} = BurgerConstructorSlice.actions;

export default BurgerConstructorSlice.reducer;