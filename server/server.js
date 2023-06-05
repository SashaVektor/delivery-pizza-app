import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import productsRoute from "./routes/productsRoute.js";
import userRoute from "./routes/userRoute.js"
import orderRoute from "./routes/orderRoute.js"
import cors from "cors"
import uploadRouter from "./routes/uploadRouter.js";

import Stripe from 'stripe';


dotenv.config();
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log(err.message))

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productsRoute)

app.use("/api/users", userRoute)

app.use("/api/orders", orderRoute)

app.use('/api/upload', uploadRouter)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/create-payment-intent', async (req, res) => {
    const items = [...req.body.mainOrder, ...req.body.additionalOrder]
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1MCPi8IjTaMkGqdTNFZFsCF1'},
                {shipping_rate: 'shr_1MCPikIjTaMkGqdTM2QEEqp7'},

            ],
            line_items: items.map(item => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: [item.image]
                        },
                        unit_amount: (parseInt(item.price * (100 / 38))) // В тест режимі ціни продуктів в долларах, в нас ціна в гривнях, тому ми переводимо цю ціну в долари згідно курсу (100 / 38)
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity

                }
            }),
            success_url: `${req.headers.origin}/success-payment`,
            cancel_url: `${req.headers.origin}/userpage`,
        }

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json({ sessionId: session.id, success: true });
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server ok on ${port}`)
})

