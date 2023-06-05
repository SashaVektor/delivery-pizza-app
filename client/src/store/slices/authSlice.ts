import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GoogleUser, User } from "../../types/typings";
import { baseUrl } from "../../helpers/constants";

interface UserInfo {
    name: string
    email: string
    password: string
}

interface LoginUser {
    email: string
    password: string
}

interface InitialStateProps {
    googleUser: GoogleUser | User | null
    error: null | SerializedError
}

export const registerUser = createAsyncThunk("registerUser",
    async (user: UserInfo) => {
        const { name, email, password } = user;
        const data = await axios.post(`${baseUrl}/api/users/signup`, {
            name, email, password
        })
        return data
    })

export const userLogin = createAsyncThunk("loginUser", async (user: LoginUser) => {
    const { email, password } = user
    const data = await axios.post(`${baseUrl}/api/users/signin`, {
        email, password
    })
    return data
})

export const googleUserLogin = createAsyncThunk("googleUserLogin", async (googleUser: GoogleUser) => {
    const { name, email} = googleUser;
    const data = await axios.post(`${baseUrl}/api/users/googleUsers/signin`, {
        name, email
    })

    return data
})

const initialState = {
    googleUser: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
    error: null,
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
            state.googleUser = action.payload?.data
            state.error = null
            localStorage.setItem("user", JSON.stringify(action.payload?.data))
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.googleUser = null
            state.error = action.error
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.googleUser = action.payload?.data
            state.error = null
            localStorage.setItem("user", JSON.stringify(action.payload?.data))
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.googleUser = null
            state.error = action.error
        })
        builder.addCase(googleUserLogin.fulfilled, (state, action) => {
            state.googleUser = action.payload?.data
            state.error = null
            localStorage.setItem("user", JSON.stringify(action.payload?.data))
        })
        builder.addCase(googleUserLogin.rejected, (state, action) => {
            state.googleUser = null
            state.error = action.error
        })
    },
})

export const { removeUser } = authSlice.actions

export default authSlice.reducer