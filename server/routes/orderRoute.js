import express from "express"
import {
    createOrder, getOrderById, getOrders,
    getUserOrders,
    removeOrder, updateOrderPayment, updateOrderStatus
} from "../controllers/orderController.js"
import { isAuth, isAdmin } from "../utils.js"


const orderRouter = express.Router()

orderRouter.post('/', createOrder)

orderRouter.get('/:id', getOrderById)

orderRouter.get("/", getOrders)

orderRouter.get("/users/userOrders", getUserOrders)

orderRouter.put("/updateStatus/:id", isAuth, isAdmin, updateOrderStatus)

orderRouter.put("/updatePayment/:id", isAuth, updateOrderPayment)

orderRouter.delete("/:id", isAuth, isAdmin, removeOrder)


export default orderRouter