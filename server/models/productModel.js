import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    name: {
        type: String, required: true, unique: true,
    },
    image: {
        type: String, required: true
    },
    category: {
        type: String, required: true
    },
    descr: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    info: {
        type: String, required: true
    },
    discount: {
        type: Number, default: 0
    },
},
    {
        timestamps: true
    }
)
const Product = mongoose.model('Product', productsSchema);

export default Product

