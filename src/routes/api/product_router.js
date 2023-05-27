import { Router } from "express";
import productManager from '../managers/products.js'

const product_router = Router()

product_router.get(
    '/products/:id',
    async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const one = await productManager.getProductsById(id)
            if(one){
                return res.json({
                    success: true,
                    product: one
                })
            }else{
                return res.json({
                    success: false,
                    product: 'There`s no product with this id'
                })
            }
        } catch(error){
            next(error)
        }
    }
)
product_router.get(
    '/products',
    async(req,res,next) => {
        try {
            const quantity = req.query.quantity ?? 4
            const products = await productManager.getProducts().slice(0, quantity)
            if(products.length > 0){
                return res.json({
                    success: true,
                    products
                })
            }else{
                return res.json({
                    success: false,
                    products: 'Products not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
product_router.post(
    '/',
    async(req,res,next) => {
        try {
            let title = req.body.title ?? null
            let description = req.body.description ?? null
            let price = req.body.price ?? null
            let stock = req.body.stock ?? null
            let code = req.body.code ?? null
            let thumbnail = re.body.thumbnail ?? null
            if(title&&description&&price&&stock&&code&&thumbnail){
                const product = productManager.addProduct(
                    {
                        title, description, price, stock, code, thumbnail
                    }
                )
                return res.json({
                    status: 201,
                    message: 'Product Created',
                    product
                })
            }else{
                res.json({
                    status: 400,
                    message: 'Check data!'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
product_router.put(
    '/:pid',
    async(req,res,next)=> {
        try {
            if(req.params.id){
            const id = Number(req.params.pid)
            productManager.updateProduct(id)
            return res.json({
                status: 200,
                message: 'product updated'
            })
        }else{
            return res.json({
                status: 400,
                message: 'Check data!'
            })
        }
        } catch (error) {
            next(error)
        }
    }
)
product_router.delete(
    '/:pid',
    async(req, res, next) => {
        try {
            const id = Number(req.params.pid)
            if(id){
                const deletedProduct = await productManager.deleteProduct({id})
                return res.json({
                    status: 200,
                    deletedProduct,
                    message: 'Product deleted'
                })
            }else{
                return res.json({
                    status: 400,
                    message: 'Seems to be a problem with the ID'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
export default product_router