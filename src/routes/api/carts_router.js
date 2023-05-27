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