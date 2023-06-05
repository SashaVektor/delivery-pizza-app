import { createSlice } from "@reduxjs/toolkit";
import { AdditionalProduct, BasketItems, PizzaItem } from "../../types/typings";
import { RootState } from "../store";

interface InitialState {
    basketItems: BasketItems[]
    additionadItems: AdditionalProduct[]
}

const initialState = {
    basketItems: localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products")!)
        : [],
    additionadItems: localStorage.getItem("additionalProducts")
        ? JSON.parse(localStorage.getItem("additionalProducts")!)
        : [],

} as InitialState

const basketSlice = createSlice({
    name: "basketSlice",
    initialState,
    reducers: {
        addBasketItem: (state, action: { payload: PizzaItem }) => {
            const currentItem = state.basketItems.find((item: BasketItems) =>
            (
                item.name === action.payload.name
                && item.info === action.payload.info
                && item.additiveItemsInfo === action.payload.additiveItemsInfo
            )
            )
            if (currentItem) {
                currentItem.quantity = currentItem.quantity + 1
                localStorage.setItem("products", JSON.stringify(state.basketItems))
            } else {
                state.basketItems = [...state.basketItems, { ...action.payload, quantity: 1 }]
                localStorage.setItem("products", JSON.stringify(state.basketItems))
            }
        },
        removeAllItems: (state) => {
            state.basketItems = []
            state.additionadItems = []
            localStorage.removeItem("products")
            localStorage.removeItem("additionalProducts")
        },
        removeItemFromBasket: (state, action: { payload: string }) => {
            const array = state.basketItems.filter((item: BasketItems) => item._id !== action.payload)
            state.basketItems = array
            localStorage.setItem("products", JSON.stringify(state.basketItems))
        },
        increaseItem: (state, action: { payload: PizzaItem }) => {
            const currentItem = state.basketItems.find((item: BasketItems) =>
            (
                item.name === action.payload.name
                && item.info === action.payload.info
                && item.additiveItemsInfo === action.payload.additiveItemsInfo
            )
            )
            if (currentItem) {
                currentItem.quantity = currentItem?.quantity + 1
                localStorage.setItem("products", JSON.stringify(state.basketItems))
            }
        },
        decreaseItem: (state, action: { payload: PizzaItem }) => {
            const currentItem = state.basketItems.find((item: BasketItems) =>
            (
                item.name === action.payload.name
                && item.info === action.payload.info
                && item.additiveItemsInfo === action.payload.additiveItemsInfo
            )
            )
            if (currentItem) {
                currentItem.quantity = currentItem?.quantity - 1
                localStorage.setItem("products", JSON.stringify(state.basketItems))
            }
        },
        addAditionadlItems: (state, action: { payload: AdditionalProduct }) => {
            state.additionadItems = [...state.additionadItems, { ...action.payload }]
            localStorage.setItem("additionalProducts", JSON.stringify(state.additionadItems))
        },
        removeAdditionalItem: (state, action: { payload: string }) => {
            const array = state.additionadItems.filter((item: AdditionalProduct) => item._id !== action.payload)
            state.additionadItems = array
            localStorage.removeItem("additionalProducts")
        },

    }
})

export const { removeAllItems, addBasketItem, increaseItem,
    decreaseItem, removeItemFromBasket, addAditionadlItems,
    removeAdditionalItem } = basketSlice.actions;

export const selectTotalPrice = (state: RootState) => state.basket.basketItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)

export const selectTotalPriceAdditionalProducts = (state: RootState) => state.basket.additionadItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)



export default basketSlice.reducer