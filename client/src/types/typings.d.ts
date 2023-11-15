export interface PizzaItem {
    _id: string
    image: string
    price: number
    name: string
    descr: string
    category: string
    info: string
    discount: number
    additiveItems?: AdditionalProduct[]
    additiveItemsInfo?: string
}

export type CreatePizza = Omit<PizzaItem, "_id", "discount">

export interface GoogleUser {
    image: string
    name: string
    _id: string
    _type: string
    email: string
    isAdmin: boolean
    token: string
}


export interface User {
    _id: string,
    name: string,
    email: string,
    isAdmin: boolean,
    token: string
}

export interface BasketItems extends PizzaItem {
    quantity: number
}

export interface AdditionalProduct {
    _id: string
    image: string
    price: number
    name: string
    category: string
    quantity: number
}

export interface CurrentOrder {
    userInfo: {
        name: string | undefined,
        phone: string | null
        email: string | undefined
    }
    userId: string | null
    mainOrder: BasketItems[]
    additionalOrder: AdditionalProduct[]
    totalPrice: number
    userAddress: string
    comments: string
    paymentMethod: "card" | "cash" | null
    payStatus: "Не оплачено" | "Оплачено"
    change: string | null
    status: "Отримано" | "Прийнято" | "Доставлено" | null

}

export interface UserOrder extends CurrentOrder {
    _id: string
    createdAt: Date
    updatedAt: Date
    __v: number
}

export type statusType = "all" | "Отримано" | "Прийнято" | "Доставлено" | null | undefined

export interface EditPizzaProps {
    id: string | undefined
    name: string,
    image: string,
    descr: string,
    price: number,
    discount: number
}