import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditProductModalOpen: false,
    isProductModalOpen: false,
    isBasketModalOpen: false,
    isAuthModalOpen: false,
    isOrderModalOpen: false,
    isAdditionalProductModalOpen: false    
}

const modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers: {
        setIsEditProductModalOpen: (state) => {
            state.isEditProductModalOpen = true
            document.body.classList.toggle('overflow-hidden');
        },
        onClose: (state) => {
            state.isEditProductModalOpen = false
            state.isProductModalOpen = false
            state.isBasketModalOpen = false
            state.isAuthModalOpen = false
            state.isOrderModalOpen = false
            state.isAdditionalProductModalOpen = false
            document.body.classList.remove('overflow-hidden');
        },
        setIsProductModalOpen: (state) => {
            state.isProductModalOpen = true
            document.body.classList.toggle('overflow-hidden');
        },
        setIsBasketModalOpen: (state) => {
            state.isBasketModalOpen = true
            document.body.classList.toggle('overflow-hidden');
        },
        setIsAuthModalOpen: (state) => {
            state.isAuthModalOpen = true
            document.body.classList.toggle('overflow-hidden');
        },
        setIsOrderModalOpen: (state) => {
            state.isOrderModalOpen = true
            document.body.classList.toggle('overflow-hidden');
        },
        setIsAdditionalProductModalOpen: (state) => {
            state.isAdditionalProductModalOpen = true
            document.body.classList.toggle('overflow-hidden');
        }
    }
})

export const {
    onClose, setIsEditProductModalOpen, setIsAuthModalOpen,
    setIsProductModalOpen, setIsBasketModalOpen, setIsOrderModalOpen,
    setIsAdditionalProductModalOpen
} = modalSlice.actions

export default modalSlice.reducer