import { createSlice } from "@reduxjs/toolkit";
import { AdditionalProduct, PizzaItem } from "../../types/typings";

const initialState = {
    product: null,
    additionalProduct: null,
} as {
    product: PizzaItem | null,
    additionalProduct: AdditionalProduct | null
}

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setEditProduct: (state, action) => {
            state.product = action.payload
        },
        setAdditionalProduct: (state, action) => {
            state.additionalProduct = action.payload
        }
    }
})

export const { setEditProduct, setAdditionalProduct } = productSlice.actions

export default productSlice.reducer