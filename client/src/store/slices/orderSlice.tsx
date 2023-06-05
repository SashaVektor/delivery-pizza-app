import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrentOrder, UserOrder } from "../../types/typings";
import axios from "axios";
import { baseUrl } from "../../helpers/constants";

interface InitialStateProps {
    orders: UserOrder[],
    currentOrder: CurrentOrder | null,
    error: SerializedError | null,
    message: string | null,
    paidOrder: UserOrder | null
}

const initialState = {
    orders: [],
    currentOrder: localStorage.getItem("currentOrder")
        ? JSON.parse(localStorage.getItem("currentOrder")!)
        : null,
    error: null,
    message: null,
    paidOrder: localStorage.getItem("paidOrder")
    ? JSON.parse(localStorage.getItem("paidOrder")!)
    : null,
} as InitialStateProps

export const createOrder = createAsyncThunk("orderSlice/createOrder", async (newOrder: CurrentOrder) => {
    const data = await axios.post(`${baseUrl}/api/orders`, { newOrder })
    return data
})

export const getOrders = createAsyncThunk("orderSlice/getOrders", async () => {
    const data = await axios.get(`${baseUrl}/api/orders`)
    return data
})


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
    extraReducers: (builder) => {
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.message = action.payload.data.message
            state.error = null
            state.currentOrder = null
            localStorage.removeItem("currentOrder")
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.error = action.error
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload.data
            state.error = null
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.error = action.error
        })
    },
})

export const { addCurrentOrder, removePaidOrder, addPaidOrder } = orderSlice.actions;

export default orderSlice.reducer