import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from './services/products'
import { setupListeners } from '@reduxjs/toolkit/query'
import authSlice from './slices/authSlice'
import basketSlice from './slices/basketSlice'
import orderSlice from './slices/orderSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import productSlice from './slices/productSlice'
import modalSlice from './slices/modalSlice'
import paginateSlice from './slices/paginateSlice'

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    auth: authSlice,
    basket: basketSlice,
    order: orderSlice,
    product: productSlice,
    modal: modalSlice,
    paginate: paginateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productsApi.middleware),
})

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)