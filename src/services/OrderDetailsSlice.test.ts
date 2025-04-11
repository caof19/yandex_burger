import OrderDetailsSlice, {closeOrderModal, fetchOrder, initialState} from './OrderDetailsSlice';

describe('Тестирования слайса модального окна готового заказ', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(OrderDetailsSlice(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('Должен получить айди заказа и открыть модальное окно', () => {
        const action = {
            type: fetchOrder.fulfilled.type,
            payload: {order: {
                number: 88,
                }}
        }

        const result = OrderDetailsSlice(initialState, action);

        expect(result.modalInfo).toEqual({
            isActiveOrderDetail: true,
            orderNum: 88,
        })
    })

    it('Должен сбросить состояние', () => {
         const action = {
            type: closeOrderModal.type,
        }

        const preLoad = {
             modalInfo: {
                 isActiveOrderDetail: true,
                 orderNum: 88,
             }
        }

        const result = OrderDetailsSlice(preLoad, action);

        expect(result.modalInfo).toEqual(initialState.modalInfo)
    })
})