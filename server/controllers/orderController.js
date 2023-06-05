import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { mailgun, payOrderEmailTemplate } from "../utils.js";

export const createOrder = expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
        userInfo: {
            name: req.body.newOrder.userInfo.name || "",
            phone: req.body.newOrder.userInfo.phone || "",
            email: req.body.newOrder.userInfo.email || "",
        },
        comments: req.body.newOrder.comments || "",
        additionalOrder: req.body.newOrder.additionalOrder || [],
        mainOrder: req.body.newOrder.mainOrder || [],
        paymentMethod: req.body.newOrder.paymentMethod || "",
        totalPrice: req.body.newOrder.totalPrice || 0,
        userAddress: req.body.newOrder.userAddress || "",
        payStatus: req.body.newOrder.payStatus || "",
        change: req.body.newOrder.change || 0,
        status: req.body.newOrder.status || "received",

    })
    const order = await newOrder.save();
    if (!order) {
        return res.status(401).send({ message: 'Что-то пошло не так!' })
    }

    mailgun().messages().send({
        from : 'Pizza Store <aveklic@gmail.com>',
        to: `${order.userInfo.name} <${order.userInfo.email}>`,
        subject: `New order ${order._id}`,
        html: payOrderEmailTemplate(order)
      }, (error, body) => {
        if(error){
          console.log(error)
        } else{
          console.log(body)
        }
      });
    res.status(201).send({ message: 'Ваш ордер создан' })

})

export const getOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find()
    res.send(orders);
})

export const getOrderById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const order = await Order.findOne({ _id: id })

    if (!order) {
        res.send({ message: "Такого ордера нету!"})
        return
    }
    res.send(order);
})

export const updateOrderStatus = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const order = await Order.findOne({ _id: id })
    if (order) {
        order.status = req.body.status
        await order.save()
        res.send({message: "Статус успешно изменен!"})
    } else {
        res.send({ message: "Такого ордера нету!"})
    }
})

export const updateOrderPayment = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const order = await Order.findOne({ _id: id })
    if (order) {
        order.payStatus = req.body.payStatus
        await order.save()
        res.send({message: "Информация об оплате изменена!"})
    } else {
        res.send({ message: "Такого ордера нету!"})
    }
})



// export const getMyOrders = expressAsyncHandler(async (req, res) => {
//     const {name} = req.params
//     const order = await Order.find({ userInfo: {
//         name: name
//     } });
//     if (!order) {
//         res.send({ message: "Ваших заказов не найдено", order: [] })
//     }
//     res.send({ order })
// })