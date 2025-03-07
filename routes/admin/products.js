const express = require('express')
const router = express.Router()
const productController = require('../../controllers/admin/product')

router.get('/products', (req, res) => productController.getAllProducts(req, res));
router.get('/product/:id', (req, res) => productController.getProductById(req, res));
router.put('/product/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/product/:id', (req, res) => productController.deleteProduct(req, res));
router.post('/product/add', (req, res) => productController.addProduct(req, res));

module.exports = router