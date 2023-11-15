import axios from "axios";
import jwt_decode from "jwt-decode"
import { CreatePizza, CurrentOrder, EditPizzaProps, statusType } from "../types/typings";
import { baseUrl } from "../helpers/constants";



export const createUser = async (response: any) => {
    const decoded: {
        name: string, picture: string,
        sub: string, email: string, token: string
    } = jwt_decode(response.credential)

    const { name, picture, sub, email, token } = decoded

    const user = {
        _id: sub,
        _type: 'user',
        name,
        token,
        email,
        image: picture,
        isAdmin: false,
    }

    return user
};

export const editPizzaItem = async (product: EditPizzaProps, token: string) => {
    const { data } = await axios.patch(`${baseUrl}/api/products`, product, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    return data
}

export const removePizzaItem = async (id: string, token: string) => {
    const { data } = await axios.delete(`${baseUrl}/api/products/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}

export const createOrder = async (newOrder: CurrentOrder) => {
    try {
        const {data} = await axios.post(`${baseUrl}/api/orders`, { newOrder })
        return data
    } catch (err) {
        console.log(err);
    }
}

export const deleteOrder = async (id: string, token: string) => {
    const { data } = await axios.delete(`${baseUrl}/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}

export const createPizza = async (product: CreatePizza, token: string) => {
    const { data } = await axios.post(`${baseUrl}/api/products`, product, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    return data
}

export const updateOrderStatus = async (status: statusType, id: string | undefined, token: string) => {

    const { data } = await axios.put(`${baseUrl}/api/orders/updateStatus/${id}`, { status }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}

export const updateOrderPayment = async (payment: "Оплачено" | "Не оплачено", id: string | undefined, token: string) => {

    const { data } = await axios.put(`${baseUrl}/api/orders/updatePayment/${id}`,
        { payStatus: payment }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}

