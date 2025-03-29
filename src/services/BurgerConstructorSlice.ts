import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit'
import {TBurgerConstructor, TProduct} from "../utils/types";


const initialState: TBurgerConstructor = {
    main: [],
    bun: {
        text: '',
        thumbnail: '',
        price: 0,
        type: 'bun',
        isLocked: true,
        mainId: '',
        ingredientsIndex: 0,
        id: '',
        _id: '',
    }
}
export const BurgerConstructorSlice = createSlice({
    name: 'BurgerConstructor',
    initialState,
    reducers: {
        changeBun: (state, action) => {
            state.bun = action.payload.bun;
        },
        addIngredientToMenu: {
            reducer: (state, action: PayloadAction<{ product: TProduct }>) => {
                const {product} = action.payload;

                if (!state.bun || Object.keys(state.bun).length === 0) {
                    return;
                }

                state.main.push(product);
            },
            prepare: (item: TProduct) => ({
                payload: {
                    product: {
                        ...item,
                        mainId: nanoid(),
                        type: 'main' as const,
                    }
                }
            })
        },
        removeIngredient: (state, action) => {
            const {id} = action.payload;

            state.main = state.main.filter(ingredient => ingredient.mainId !== id)
        },
        reorderIngredients: (state, action) => {
            const {id, replaceToId} = action.payload;

            const element = state.main.splice(id, 1)[0];
            state.main.splice(replaceToId, 0, element);
        },
        clearCart: (state) => {
            state.main = [];
            state.bun = {...initialState.bun};
        }
    }
})

export const {
    changeBun,
    addIngredientToMenu,
    removeIngredient,
    reorderIngredients,
    clearCart
} = BurgerConstructorSlice.actions;

export default BurgerConstructorSlice.reducer;