import { configureStore } from '@reduxjs/toolkit';
import BurgerConstructor from './BurgerConstructorSlice.js';
import Ingredients from './IngredientsSlice.js';
import IngredientsDetails from './IngredientDetailsSlice.js';
import OrderDetails from './OrderDetailsSlice.js';

export default configureStore({
  reducer: {
    BurgerConstructor,
    Ingredients,
    IngredientsDetails,
    OrderDetails
  },
})