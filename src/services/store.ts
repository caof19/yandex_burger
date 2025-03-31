import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {createSocketMiddleware} from "../utils/useSocket.ts";

import BurgerConstructor from './BurgerConstructorSlice';
import Ingredients from './IngredientsSlice';
import IngredientsDetails from './IngredientDetailsSlice';
import OrderDetails from './OrderDetailsSlice';
import UserDetails from './UserSlice';
import FeedDetail from "./FeedDetailSlice";
import HistoryList, {chatWSActions} from "./HistoryListSlice.ts"


export const store = configureStore({
    reducer: {
        BurgerConstructor,
        Ingredients,
        IngredientsDetails,
        OrderDetails,
        UserDetails,
        FeedDetail,
        HistoryList,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(createSocketMiddleware(chatWSActions)),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
