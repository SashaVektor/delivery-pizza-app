import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler"

export const getProducts = async (req, res) => {
    try {
        const products = (await Product.find()).sort((a, b) => b.createdAt - a.createdAt);
        res.send(products);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }
}

export const createProduct = expressAsyncHandler(async (req, res) => {
    try {
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
        if (prod) {
            res.status(200).send({ message: 'Продукт створено успішно!' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }
})

export const editProduct = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.body.id);

        if(product) {
            product.name = req.body.name || product.name
            product.image = req.body.image || product.image
            product.descr = req.body.descr || product.descr
            product.discount = req.body.discount
            product.price = req.body.price || product.price

            const updatedProduct = await product.save();

            if (!updatedProduct) {
                res.status(403).send({ message: "Щось пішло не так!" })
                return
            }

            res.status(200).send({ message: "Продукт успішно змінено!" })
        } else {
            return res.status(404).send({message: "Product Not Found"})
        }
       
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }
})


export const removeProduct = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.send({ message: "Продукт успішно видалено" })
        } else {
            res.status(404).send({ message: "Product not found" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "INTERNAL SERVER ERROR" })
    }
})