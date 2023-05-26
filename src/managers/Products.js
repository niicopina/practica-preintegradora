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
    deleteProduct(id){
        const products = this.getProductsFromFile()
        const index = products.findIndex(p => p.id === id)
        if(index === -1){
            console.error('Product not found!')
            return
        }
        products.splice(index, 1)
        this.saveProductsToFile(products)
    }
    getProductsFromFile(){
        const data = fs.readFileSync(this.path, 'utf-8')
        return JSON.parse(data)
    }
    saveProductsToFile(products){
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
    }
}
const productManager = new ProductManager('./src/data/products.json')

/* productManager.addProduct({
    title: 'Lemon Pie',
    description: 'Torta de limon',
    price: 3000,
    stock: 3,
    thumbnail: "https://pasteleriadc.com/wp-content/uploads/torta-dripcake-helado-768x1078.jpg",
    code: 'prod1'
}) */

export default productManager