const Product = require('../../models/product')

class adminController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products', error: error.message });
        }
    }

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

    async updateProduct(req, res) {
        const productId = req.params.id;
        const updatedData = req.body;
        try {
            const [updated] = await Product.update(updatedData, { where: { id: productId } });
            if (!updated) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error: error.message });
        }
    }

    async deleteProduct(req, res) {
        const productId = req.params.id;
        try {
            const deleted = await Product.destroy({ where: { id: productId } });
            if (!deleted) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error: error.message });
        }
    }

    async addProduct(req, res) {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            userId: req.user.id
        })
        res.status(201).json({
            message: 'Product is added',
            productId: product.id
        })
    } 

}

module.exports = new adminController()
