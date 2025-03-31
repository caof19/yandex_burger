import {TOrderInfo, TProduct} from "./types.ts";

export const formatOrders = (orders: TOrderInfo[], ingredients: TProduct[]) => {
    return orders.map(item => {
        let statusRus = '';

        const neddleIngredients = item.ingredients.map(item => {
            const product = ingredients.find((ingredient) => ingredient._id === item.toString())

            if (product) {
                return {
                    price: product.price,
                    img: product.image_mobile,
                    name: product.name,
                }
            }
        })

        switch (item.status) {
            case 'created':
                statusRus = 'Создан'
                break;
            case 'pending':
                statusRus = 'Готовится'
                break;
            case 'done':
                statusRus = 'Выполнен'
                break;
        }


        return {
            name: item.name,
            number: item.number,
            date: item.createdAt,
            ingredients: neddleIngredients,
            status: statusRus,
        }
    })
}

export const getSuccessIds = (orders: TOrderInfo[]) => {
    return filterIds(orders, 'done')
}
export const getInProgressIds = (orders: TOrderInfo[]) => {
    return filterIds(orders, 'pending')
}

const filterIds = (orders: TOrderInfo[], status: string) => {
    return orders.map((item: TOrderInfo) => {
        if (item.status === status) {
            return item.number;
        }
    })
}
