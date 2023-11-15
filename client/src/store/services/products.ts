import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PizzaItem, User, UserOrder } from '../../types/typings'
import { baseUrl } from '../../helpers/constants'

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/` }),
    endpoints: (builder) => ({
        getProducts: builder.query<PizzaItem[], void>({
            query: () => `products`,
        }),
        getOrders: builder.query<UserOrder[], void>({
            query: () => `orders`,
        }),
        getAllUsers: builder.query<User[], void>({
            query: () => `users`,
        }),
        getOrderById: builder.query<UserOrder, string | undefined>({
            query: (id) => `orders/${id}`,
        }),
        getUserOrders: builder.query<UserOrder[], string>({
            query: (userId) => `orders/users/userOrders?userId=${userId}`,
        }),
    }),
})

export const { 
    useGetProductsQuery, useGetOrdersQuery,
    useGetAllUsersQuery, useGetOrderByIdQuery,
    useGetUserOrdersQuery
} = productsApi