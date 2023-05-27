import { Router } from "express";
import product_router from "./product_router.js";

const api_router = Router()

api_router.use('/products', product_router)

export default api_router