import fs from 'fs'
import productManager from './products.js'

class CartManager{
    constructor(path){
        this.path = path
    }
    async addCart(){
        try{
        const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const newCart = {
            id: carts.length + 1,
            products: []
        }
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
        return newCart.id
        }catch(error){
            console.error(error)
            return 'addCart: error'
        }
    }
    async getCartById(cid){
        try {
            const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            const cart = carts.find(c => c.id === parseInt(cid))
            if(!cart){
                return 'Not found'
            }else{
                return cart
            }
        } catch (error) {
            console.error(error)
            return 'getCartById: error'
        }
    }
    async updateCart(id, productId, units){
        try {
            const carts = await this.getCartFromFile()
            const cart = carts.find(c => c.id === id)
            if(!carts){
                return 'cart not found!'
            }
            const product = await productManager.getProductsById(productId)
            if(!product){
                return 'Product not found'
            }
            const availableUnits = product.stock
            if(units > availableUnits){
                return 'Not enough units available'
            }
            const existingProduct = cart.products.find(p => p.id === productId)
            if(existingProduct){
                if(units > existingProduct.units){
                    const unitsToAdd = units - existingProduct.units
                    if(unitsToAdd > availableUnits){
                        return 'Not enough units available'
                    }
                    existingProduct.units += unitsToAdd
                    product.stock -=unitsToAdd
                }else if(units < existingProduct.units){
                    const unitsToRemove = existingProduct.units - units
                    existingProduct.units -= unitsToRemove
                    product.stock += unitsToRemove
                }
            }else{
                if(units > availableUnits){
                    return 'not enough units available'
                }
                cart.products.push({id: productId, units})
                product.stock -= units
            }
            await this.saveCartToFile(carts)
            return 'Cart updated'
        } catch (error) {
            console.error(error)
            return 'error updating cart'
        }
    }
    async deleteCartProduct(id, productId, units){
        try {
            const carts = await this.getCartFromFile()
            const cart = carts.find(c => c.id === id)
            if(!cart){
                return 'Cart not found'
            }
            const existingProduct = cart.products.find(p => p.id === productId)
            if(!existingProduct){
                return 'Product not found in the cart'
            }
            const product = await productManager.getProductsById(productId)
            if(!product){
                return 'Product not found'
            }
            if(units > existingProduct.units){
                return 'Not enough units in the cart'
            }
            existingProduct.units -= units
            product.stock += units
            if(existingProduct.units === 0){
                cart.products = cart.products.filter(p => p.id !== productId)
            }
            await this.saveCartToFile(carts)
            return 'Cart product deleted successfylly'
        } catch (error) {
            console.log(error)
            return 'Error deleting cart product'
        }
    }
}
const cartManager = new CartManager('./src/data/carts.json')

export default cartManager