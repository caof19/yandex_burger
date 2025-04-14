import {TProduct} from "./types.ts";

export const mockIngredient: TProduct[] = [
    {
        text: 'test2',
        thumbnail: "https://test",
        price: 1255,
        type: "bun",
        isLocked: false,
        mainId: 'test',
        ingredientsIndex: 0,
        id: "test",
        _id: "test",
        current: 0,
    },
    {
        text: 'test1',
        thumbnail: "https://test",
        price: 999,
        type: "bun",
        isLocked: false,
        mainId: 'test1',
        ingredientsIndex: 0,
        id: "test1",
        _id: "test1",
        current: 0,
    },
];

export const bunMock: TProduct = {
    text: 'bunTest',
    thumbnail: 'https://bunTest',
    price: 100,
    type: 'bun',
    isLocked: true,
    mainId: 'bunTest',
    ingredientsIndex: 0,
    id: 'bunTest',
    _id: 'bunTest',
}

export const mockOrder = {
    _id: "644076e345c6f2001be6bf01",
    ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0943"
    ],
    owner: "643d822745c6f2001be6ad80",
    status: "done",
    name: "Space флюоресцентный бургер",
    createdAt: "2023-04-19T23:18:59.682Z",
    updatedAt: "2023-04-19T23:18:59.756Z",
    number: 777,
}

export const mockOrders = {
    total: 1,
    today: 1,
    successId: ['testId'],
    inProgressId: ['testId2'],
    orders: [mockOrder]
}

export const mockModalIngredient= {
    image_large: 'https://test',
    name: 'test',
    calories: '10',
    proteins: '10',
    fat: '10',
    carbohydrates: '10',
}

export const mockUser = {
    user: {
        name: 'test',
        email: 'test@test.ru',
    }
}