import fs from 'fs'

class ProductManager {
    constructor(path){
        this.path = path
        this.nextId = 1
        if(!fs.existsSync(path)){
            fs.writeFileSync(path, JSON.stringify([]))
        }
    }
    addProduct(product){
        const products = this.getProductsFromFile()
        if( !product.title ||
            !product.description ||
            !product.price ||
            !product.stock ||
            !product.thumbnail ||
            !product.code){
                console.error('Every camp is required')
            }
        if(products.some(p => p.code === product.code)){
            console.error('A product with the same code already exist')
            return
        }
        product.id = this.nextId++
        products.push(product)
        this.saveProductsToFile(products)
    }
    getProducts(){
        return this.getProductsFromFile()
    }
    getProductsById(){
        const products = this.getProductsFromFile()
        const product = products.find(p => p.id === id)
        if(!product){
            console.error('Product not found!')
            return null
        }
        return product
    }
    updateProduct(id, updatedProduct){
        const products = this.getProductsFromFile()
        const index = products.findIndex(p => p.id === id)
        if(index === -1){
            console.error('Product not found!')
            return
        }
        products[index] = {
            ...products[index],
            ...updatedProduct,
            id: id
        }
        this.saveProductsToFile(products)
    }
}