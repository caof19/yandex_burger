import {ReactElement} from "react";

export type TProtectedArgument = {
    onlyAuth?: boolean,
    onlyUnAuth?: boolean,
    element: ReactElement,
}

export type TProduct = {
    text: string,
    thumbnail: string,
    price: number,
    type: 'top' | 'bottom' | 'main' | 'bun',
    isLocked: boolean,
    mainId: string,
    ingredientsIndex: number,
    id: string,
    _id: string,
    locked?: boolean,
    name?: string,
    image_mobile?: string
    current?: number,
    image?: string
}

export type TBurgerConstructor = {
    main: TProduct[],
    bun: TProduct,
}

export type TUser = {
    info: {
        name: string,
        email: string,
        lastURL: string,
    },
    tokens: {
        accessToken: string,
        refreshToken: string,
    }
}

export type THeaderItem = {
    icon: string,
    name: string,
    isActive: boolean,
    href: string
}
export type THeader = {
    menu: THeaderItem[],
}

export type ModalInfo = {
    modalInfo: {
        isActiveIngredients: boolean,
        img: string,
        name: string,
        info: {
            calories: string,
            proteins: string,
            fat: string,
            carbohydrates: string
        }
    }
}

export type TModal = {
    children: ReactElement,
    onCloseModal?: () => void,
    hideClose?: boolean,
    hideOverlay?: boolean
}

export type TModalOverlay = {
    closeCallback: () => void
}

export interface IFetchEndpoint {
    endpoint: string
}

export interface IUnAuth extends IFetchEndpoint {
    userData: {
        email?: string,
        password?: string,
        name?: string
        token?: string
    }
}

export interface IAuth extends IFetchEndpoint {
    userData?: {
        email?: string,
        password?: string
        login?: string
        name?: string
    }
    method?: string
}

export type TIngredients = {
    isLoad: boolean,
    isError: boolean,
    ingredients: TProduct[]
}

export type TBurgerIngredients = {
    items: TProduct[],
    name: string,
    isActive: boolean
}

export type TIngredientsCategory = {
    slug: string,
    categoryName: string,
    products: TProduct[],
}
export type TNavIngredient = {
    menu: Record<string, TBurgerIngredients>,
    onClick: (slug: string) => void,
}
export type UserData = {
    email: {
        disabled: boolean;
        value: string;
    };
    name: {
        disabled: boolean;
        value: string;
    };
    password: {
        disabled: boolean;
        value: string;
    };
}

export type UserDataField = keyof UserData;

export type FetchArgs = {
    method: string;
    headers: Record<string, string>;
    body?: string;
};
export type UserInfo = {
  name: string;
  email: string;
  lastURL?: string;
}

export type TOrderIngredients = {
    _id?: string,
    price: number,
    img: string,
    count?: number
    name?: string,
}
export type TOrderInfo = {
    _id?: string,
    status?: string,
    createdAt: string,
    number: number,
    name: string,
    date: string,
    ingredients: TOrderIngredients[],
}

export type TOrderInfoDate = Omit<TOrderInfo, 'date'> & {date: Date}

export type TFeed = {
    orders: {
        total: number,
        today: number,
        info: TOrderInfo[] | TOrderInfoDate[]
    },
    successId: number[],
    inProgressId: number[],
}

export type TFeedDetail = {
    info: {
        number: number,
        name: string,
        status: string,
        date: string,
        ingredients: string[],
        formatIngredients?: TOrderIngredients[],
    }
}

export type TOrders = {
    orders: TOrderInfo[] | undefined,
}