import { createSlice } from "@reduxjs/toolkit";
import { CurrentOrder, UserOrder } from "../../types/typings";

interface InitialStateProps {
    currentOrder: CurrentOrder | null,
    paidOrder: UserOrder | null
}

const initialState = {
    currentOrder: localStorage.getItem("currentOrder")
        ? JSON.parse(localStorage.getItem("currentOrder")!)
        : null,
    paidOrder: localStorage.getItem("paidOrder")
    ? JSON.parse(localStorage.getItem("paidOrder")!)
    : null,
} as InitialStateProps

const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        addCurrentOrder: (state, action: { payload: CurrentOrder }) => {
            state.currentOrder = action.payload
            localStorage.setItem("currentOrder", JSON.stringify(action.payload))
        },
        addPaidOrder: (state, action: {payload: UserOrder}) => {
            state.paidOrder = action.payload
            localStorage.setItem("paidOrder", JSON.stringify(action.payload))
        },
        removePaidOrder: (state) => {
            state.paidOrder = null
            localStorage.removeItem("paidOrder")
        }
    },
})

export const { addCurrentOrder, removePaidOrder, addPaidOrder } = orderSlice.actions;

export default orderSlice.reducer