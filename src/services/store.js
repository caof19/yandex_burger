import { configureStore } from '@reduxjs/toolkit';
import BurgerConstructor from './BurgerConstructorSlicer.js';
import Ingredients from './IngredientsSlicer.js';
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