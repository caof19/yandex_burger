import ingredientReducer, {
    fetchIngredients,
    resetAllIngredients,
    resetIngredient,
    unUseIngredient,
    useIngredient
} from './IngredientsSlice';
import {mockIngredient} from '../utils/mockData';

describe('Тестирования слайса ингредиентов', () => {

    const mockInitialState = {
        isLoad: false,
        isError: false,
        ingredients: [],
    }

    it('Должен вернуть начальное состояние', () => {
        expect(ingredientReducer(undefined, { type: 'unknown' })).toEqual(mockInitialState)
    })

    it('Должен вернуть ингредиенты и обновить стейт', async () => {

        const action = {
            type: fetchIngredients.fulfilled.type,
            payload: {data: mockIngredient}
        }

        const result = ingredientReducer(mockInitialState, action);

        expect(result.ingredients).toEqual(mockIngredient);
    });

    it('должен увеличить количество ингредиента при его использовании', () => {
        const action = {
            type: useIngredient.type,
            payload: {id: 'test'}
        }

        const preloadData = {
            isLoad: false,
            isError: false,
            ingredients: mockIngredient,
        }



        const result = ingredientReducer(preloadData, action);

        expect(result.ingredients[0].current).toEqual(1);
        expect(result.ingredients[1].current).toEqual(0);
    })

    it('должен уменьшать количество ингредиента при его удалении', () => {
        const action = {
            type: unUseIngredient.type,
            payload: {id: 'test'}
        }

        const newMockIngredients = mockIngredient.map(item => ({
                ...item,
                current: 2
            }))

        const preloadData = {
            isLoad: false,
            isError: false,
            ingredients: newMockIngredients,
        }

        const result = ingredientReducer(preloadData, action);

        expect(result.ingredients[0].current).toEqual(1);
        expect(result.ingredients[1].current).toEqual(2);
    })

    it('должен обнулять количество используемых элементов у одного ингредиента', () => {
        const action = {
            type: resetIngredient.type,
            payload: {id: 'test'}
        }

        const newMockIngredients = mockIngredient.map(item => ({
                ...item,
                current: 2
            }))

        const preloadData = {
            isLoad: false,
            isError: false,
            ingredients: newMockIngredients,
        }

        const result = ingredientReducer(preloadData, action);

        expect(result.ingredients[0].current).toEqual(0);
        expect(result.ingredients[1].current).toEqual(2);
    })

    it('должен обнулять количество используемых элементов у всех ингредиентов', () => {
        const action = {
            type: resetAllIngredients.type,
        }

        const newMockIngredients = mockIngredient.map(item => ({
                ...item,
                current: 2
            }))

        const preloadData = {
            isLoad: false,
            isError: false,
            ingredients: newMockIngredients,
        }

        const result = ingredientReducer(preloadData, action);

        expect(result.ingredients[0].current).toEqual(0);
        expect(result.ingredients[1].current).toEqual(0);
    })
});