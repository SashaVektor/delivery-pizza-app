import mongoose from "mongoose";
import moment from "moment-timezone";


const orderSchema = new mongoose.Schema(
    {
        userInfo: {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: true }
        },
        userId: { type: String, default: null },
        comments: { type: String },
        additionalOrder: [{
            _id: { type: String, },
            image: { type: String, },
            price: { type: Number, },
            name: { type: String, },
            category: { type: String, },
            quantity: { type: Number, },
        }],
        mainOrder: [{
            _id: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            name: { type: String, required: true },
            descr: { type: String, required: true },
            category: { type: String, required: true },
            quantity: { type: Number, required: true },
            info: { type: String, required: true },
            additiveItems: [{
                _id: { type: String, },
                image: { type: String, },
                price: { type: Number, },
                name: { type: String, },
                category: { type: String, },
                quantity: { type: Number, },
            }],
            additiveItemsInfo: { type: String, default: "" },
        }],
        paymentMethod: { type: String, required: true },
        payStatus: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        userAddress: { type: String, required: true },
        change: { type: String, required: false, default: 0 },
        status: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

orderSchema.pre('save', function (next) {
    this.updatedAt = moment().tz('Europe/Kiev');
    next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order