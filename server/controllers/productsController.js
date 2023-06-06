import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler"

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.send(products);
}

export const createProduct = async (req, res) => {
    const product = req.body;
    const newProduct = new Product({
        name: product.name,
        image: product.image,
        category: product.category,
        descr: product.descr,
        price: product.price,
        info: product.info,
        discount: product.discount
    })
    const prod = await newProduct.save();
    res.send({ message: 'Product created', prod })
}


export const removeProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.send({ message: "Product deleted" })
    } else {
        res.status(404).send({ message: "Product not found" })
    }
})