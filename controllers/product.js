const Product = require('../models/product')

class productController {
    async getProductById(req, res) {
        const productId = req.params.id;
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product', error: error.message });
        }
    }

    async getAllProducts(req, res) {
        const products = await Product.findAll()
        console.log(products)
        res.status(201).json({
            products: products
        })
    }
}

module.exports = new productController()
