import {TFeedDetail} from "../utils/types.ts";
import FeedDetailSlice, {fetchOrder, setFormatedIngredients} from './FeedDetailSlice'
import {mockOrder} from "../utils/mockData.ts";

describe('Тестирования слайса показа заказов', () => {
    const initialState: TFeedDetail = {
        info: {
            number: 0,
            name: '',
            status: '',
            date: '',
            ingredients: [
                ''
            ],
            formatIngredients: [{
                img: 'https://code.s3.yandex.net/react/code/bun-01.png',
                price: 0,
                count: 0,
            }
            ]
        }
    }

    it('Должен вернуть начальное состояние', () => {
        expect(FeedDetailSlice(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('Должен вернуть готовый заказ', () => {
        const action = {
            type: fetchOrder.fulfilled.type,
            payload: {orders: [mockOrder]}
        }

        const result = FeedDetailSlice(initialState, action);

        expect(result.info).toEqual({
            name: mockOrder.name,
            number: mockOrder.number,
            ingredients: mockOrder.ingredients,
            date: mockOrder.createdAt,
            status: 'Выполнен',
        });
    })

    it('Должен вернуть форматированный ингредиент', () => {
        const mockFormatIngredient = {
                img: 'https://testImage',
                price: 99,
                count: 5,
            }

        const action = {
            type: setFormatedIngredients.type,
            payload: [mockFormatIngredient]
        }

        const result = FeedDetailSlice(initialState, action);

        expect(result.info.formatIngredients).toEqual([mockFormatIngredient]);
    })
})