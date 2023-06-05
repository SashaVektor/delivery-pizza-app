import express from "express"
import { createProduct, getProducts, removeProduct } from "../controllers/productsController.js"
import { isAdmin, isAuth } from "../utils.js"

const productsRoute = express.Router()

productsRoute.get("/", getProducts)

productsRoute.delete("/:id", isAuth, isAdmin, removeProduct)

productsRoute.post("/", isAuth, isAdmin, createProduct)

export default productsRoute