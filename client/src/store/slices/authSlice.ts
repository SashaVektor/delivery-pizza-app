import { createSlice } from "@reduxjs/toolkit";
import { GoogleUser, User } from "../../types/typings";
import { googleUserLogin, registerUser, userLogin } from "../../utils/auth";


interface InitialStateProps {
    googleUser: GoogleUser | User | null,
}


const initialState = {
    googleUser: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
} as InitialStateProps

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        removeUser: (state) => {
            state.googleUser = null
            localStorage.removeItem("user")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.googleUser = action.payload
            !action.payload?.email
                ? ""
                : localStorage.setItem("user", JSON.stringify(action.payload))
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.googleUser = action.payload
            !action.payload?.email
                ? ""
                : localStorage.setItem("user", JSON.stringify(action.payload))
        })
        builder.addCase(googleUserLogin.fulfilled, (state, action) => {
            state.googleUser = action.payload
            !action.payload?.email
                ? ""
                : localStorage.setItem("user", JSON.stringify(action.payload))
        })
    },
})

export const { removeUser } = authSlice.actions

export default authSlice.reducer