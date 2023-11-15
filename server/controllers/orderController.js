import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { mailgun, payOrderEmailTemplate } from "../utils.js";

export const createOrder = expressAsyncHandler(async (req, res) => {
    try {
        const newOrder = new Order({
            userInfo: {
                name: req.body.newOrder.userInfo.name || "",
                phone: req.body.newOrder.userInfo.phone || "",
                email: req.body.newOrder.userInfo.email || "",
            },
            userId: req.body.newOrder.userId || null,
            comments: req.body.newOrder.comments || "",
            additionalOrder: req.body.newOrder.additionalOrder || [],
            mainOrder: req.body.newOrder.mainOrder || [],
            paymentMethod: req.body.newOrder.paymentMethod || "",
            totalPrice: req.body.newOrder.totalPrice || 0,
            userAddress: req.body.newOrder.userAddress || "",
            payStatus: req.body.newOrder.payStatus || "",
            change: req.body.newOrder.change || 0,
            status: req.body.newOrder.status || "Отримано",

        })
        const order = await newOrder.save();
        if (!order) {
            return res.status(401).send({ message: 'Что-то пошло не так!' })
        }

        mailgun().messages().send({
            from: 'Pizza Store <aveklic@gmail.com>',
            to: `${order.userInfo.name} <${order.userInfo.email}>`,
            subject: `New order ${order._id}`,
            html: payOrderEmailTemplate(order)
        }, (error, body) => {
            if (error) {
                console.log(error)
            } else {
                console.log(body)
            }
        });
        res.status(201).send({ message: 'Замовлення успішно створено!' })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }

})

export const getOrders = expressAsyncHandler(async (req, res) => {
    try {
        const orders = (await Order.find()).sort((a, b) => b.createdAt - a.createdAt)
        res.send(orders);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }
})

export const getOrderById = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findOne({ _id: id })

        if (!order) {
            res.send({ message: "Такого ордера нету!" })
            return
        }
        res.send(order);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }
})

export const updateOrderStatus = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findOne({ _id: id })
        if (order) {
            order.status = req.body.status
            await order.save()
            res.send({ message: "Статус успішно змінено!" })
        } else {
            res.send({ message: "Такого ордера нету!" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }
})

export const updateOrderPayment = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findOne({ _id: id })
        if (order) {
            order.payStatus = req.body.payStatus
            await order.save()
            res.send({ message: "Статус успішно змінено!" })
        } else {
            res.send({ message: "Такого ордера нету!" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }
})

export const removeOrder = expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.send({ message: "Замовлення видалено успішно!" })
        } else {
            res.status(404).send({ message: "Замовлення не знайдено!" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }
})


export const getUserOrders = expressAsyncHandler(async (req, res) => {
    const { userId } = req.query
    try {
        const orders = (await Order.find({ userId })).sort((a, b) => b.createdAt - a.createdAt);
        res.send(orders)
    } catch (err) {
        res.status(500).send({ message: err })
    }
})