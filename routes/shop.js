const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/cart', (req, res) => shopController.getCart(req, res));
router.post('/cart/:id', (req, res) => shopController.addProduct(req, res));
router.delete('/cart/:id', (req, res) => shopController.removeProduct(req, res));

module.exports = router;
