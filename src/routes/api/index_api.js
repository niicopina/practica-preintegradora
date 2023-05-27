import { Router } from "express";
import product_router from "./product_router.js";
import carts_router from "./carts_router.js";

const api_router = Router()

api_router.use('/products', product_router)
api_router.use('/carts', carts_router)

export default api_router