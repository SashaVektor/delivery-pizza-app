import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../helpers/constants"
import { GoogleUser } from "../types/typings"

interface UserInfo {
    name: string
    email: string
    password: string
}

interface LoginUser {
    email: string
    password: string
}

export const registerUser = createAsyncThunk("registerUser", async (user: UserInfo) => {
    try {
        const { name, email, password } = user;
        const { data } = await axios.post(`${baseUrl}/api/users/signup`, {
            name, email, password
        })
        
        return data
    } catch (err) {
        console.log(err);
    }
})

export const userLogin = createAsyncThunk("loginUser", async (user: LoginUser) => {
try {
    const { email, password } = user
    const { data } = await axios.post(`${baseUrl}/api/users/signin`, {
        email, password
    })

    return data
    
} catch (err) {
    console.log(err);
}
})

export const googleUserLogin = createAsyncThunk("googleUserLogin", async (googleUser: GoogleUser) => {
try {
    const { name, email } = googleUser;
    const { data } = await axios.post(`${baseUrl}/api/users/googleUsers/signin`, {
        name, email
    })

    return data
} catch (err) {
    console.log(err);
}
})