import {TBurgerConstructor} from "../utils/types.ts";
import BurgerConstructorReducer, {
    addIngredientToMenu,
    changeBun, clearCart,
    removeIngredient,
    reorderIngredients
} from "./BurgerConstructorSlice.ts";
import {bunMock, mockIngredient} from "../utils/mockData.ts";

describe('Тестирования слайса конструктора', () => {

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

    it('Должен вернуть начальное состояние', () => {
        expect(BurgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('Должен сменить булочку', () => {
        const action = {
            type: changeBun.type,
            payload: {bun: bunMock}
        }

        const result = BurgerConstructorReducer(initialState, action);

        expect(result.bun).toEqual(bunMock);
    })

    it('Должен добавить ингредиент в конструктор', () => {
        const action = {
            type: addIngredientToMenu.type,
            payload: {product: mockIngredient[0]}
        }

        const result = BurgerConstructorReducer(initialState, action);

        expect(result.main[0]).toEqual(mockIngredient[0]);
    })

    it('Должен удалить ингредиент из меню', () => {
        const action = {
            type: removeIngredient.type,
            payload: {id: 'test1'}
        }

        const preloadData = {
            ...initialState,
            main: mockIngredient
        }

        const result = BurgerConstructorReducer(preloadData, action);

        expect(result.main.length).toEqual(1);
    })

    it('Должен поменять местами ингредиенты в меню', () => {
        const action = {
            type: reorderIngredients.type,
            payload: {id: 0, replaceToId: 1}
        }

        const preloadData = {
            ...initialState,
            main: mockIngredient
        }

        const result = BurgerConstructorReducer(preloadData, action);

        expect(result.main).toEqual([mockIngredient[1], mockIngredient[0]]);
    })

    it('Должен очистить корзину', () => {
        const action = {
            type: clearCart.type,
        }

        const preloadData = {
            ...initialState,
            main: mockIngredient
        }

        const result = BurgerConstructorReducer(preloadData, action);

        expect(result.main.length).toEqual(0);
    })
})