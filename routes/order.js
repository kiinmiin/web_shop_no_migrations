const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post('/order', orderController.createOrder);

router.get('/orders', orderController.getUserOrders);

module.exports = router;
