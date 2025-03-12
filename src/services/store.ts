import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import BurgerConstructor from './BurgerConstructorSlice';
import Ingredients from './IngredientsSlice';
import IngredientsDetails from './IngredientDetailsSlice';
import OrderDetails from './OrderDetailsSlice';
import UserDetails from './UserSlice';

export const store = configureStore({
  reducer: {
    BurgerConstructor,
    Ingredients,
    IngredientsDetails,
    OrderDetails,
    UserDetails
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
