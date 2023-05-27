import { Router } from "express";
import cartManager from '../../managers/carts.js'

const carts_router = Router()

carts_router.get(
    '/carts/:id',
    async(req,res,next)=> {
        try {
            const id = Number(req.params.id)
            const one = await cartManager.getCartById(id)
            if(one){
                return res.json({
                    success: true,
                    cart: one
                })
            }else{
                return res.json({
                    success: false,
                    cart: 'No cart with this ID'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
carts_router.post(
    '/',
    async(req,res,next)=> {
        try {
            const cartId = await cartManager.addCart()
            return res.json({
                status: 201,
                message: 'Cart created',
                cartId
            })
        } catch (error) {
            next(error)
        }
    }
)
carts_router.put(
    '/carts/:cid/product/:pid/:units',
    async(req,res,next)=> {
        try {
            const cartId = parseInt(req.params.cid)
            const productId = parseInt(req.params.pid)
            const units = parseInt(req.params.units)
            const result = await cartManager.deleteCartProduct(cartId, productId, units)
            if( result === 'Cart not found' || 
                result === 'Product not found in cart' ||
                result === 'Not enough units in the cart'){
                    return res.json({
                        status: 400,
                        message: result
                    })
                }else if(result === 'Error deleting cart product'){
                    return res.json({
                        status: 500,
                        message: result
                    })
                }
                return res.json({
                    status: 200,
                    message: 'Cart product deleted successfully'
                })
        } catch (error) {
            next(error)
        }
    }
)

export default carts_router