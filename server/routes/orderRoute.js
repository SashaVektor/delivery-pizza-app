import express from "express"
import { createOrder, getOrderById, getOrders, updateOrderPayment, updateOrderStatus } from "../controllers/orderController.js"
import { isAuth, isAdmin } from "../utils.js"


const orderRouter = express.Router()

orderRouter.post('/', createOrder)

orderRouter.get('/:id', getOrderById)

orderRouter.get("/", getOrders)

orderRouter.put("/updateStatus/:id", isAuth, isAdmin, updateOrderStatus)

orderRouter.put("/updatePayment/:id", isAuth, updateOrderPayment)


export default orderRouter