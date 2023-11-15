import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ordersPaginate: 1,
    userPaginate: 1,
}

const paginateSlice = createSlice({
    name: "paginateSlice",
    initialState,
    reducers: {
        setOrderPaginate: (state, action) => {
            state.ordersPaginate = action.payload
        },
        setUserPaginate: (state, action) => {
            state.userPaginate = action.payload
        }
    }
})

export const {setOrderPaginate, setUserPaginate} = paginateSlice.actions
export default paginateSlice.reducer