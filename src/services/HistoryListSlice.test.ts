import {TFeed} from "../utils/types.ts";
import HistoryList, {onMessage} from './HistoryListSlice';
import {mockOrders} from "../utils/mockData.ts";

describe('Тестирования слайса показа истории заказов', () => {
    const initialState: TFeed = {
        total: 0,
        today: 0,
        ordersList: [
            {
                _id: '',
                number: 0,
                name: '',
                createdAt: '',
                date: '',
                ingredients: [
                    {
                        price: 0,
                        img: ''
                    }
                ]
            }
        ],
        successId: [0],
        inProgressId: [0],
    };

    it('Должен вернуть начальное состояние', () => {
        expect(HistoryList(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('Должен поместить новый заказ к другим и обновить общее состояние', () => {
        const action = {
            type: onMessage.type,
            payload: mockOrders
        }

        const result = HistoryList(initialState, action);

        expect(result).toEqual({
            total: mockOrders.total,
            today: mockOrders.today,
            ordersList: mockOrders.orders,
            successId: mockOrders.successId,
            inProgressId: mockOrders.inProgressId
        });
    })
})