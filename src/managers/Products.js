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
}