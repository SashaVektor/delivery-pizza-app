import { Options } from "../../components/adminComponents/SelectStatus";

export const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8888";

export const paymentOptions: Options[] = [
    {
        value: "Не оплачено",
        text: "Не оплачено"
    },
    {
        value: "Оплачено",
        text: "Оплачено"
    },
]

export const statusOptions: Options[] = [
    {
        value: "received",
        text: "Получено"
    },
    {
        value: "accepted",
        text: "Принято"
    },
    {
        value: "delivered",
        text: "Доставлено"
    },
]