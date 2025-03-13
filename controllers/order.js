const models = require('../models/index');

exports.createOrder = async (req, res) => {
    try {
        const userCart = await req.user.getCart();
        const cartProducts = await userCart.getProducts();

        if (cartProducts.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const order = await models.Order.create({
            userId: req.user.id,
            totalAmount: cartProducts.reduce((total, product) => total + product.price, 0)
        });

        const orderItems = cartProducts.map(product => {
            return {
                orderId: order.id,
                productId: product.id,
                quantity: 1 
            };
        });

        await models.OrderItem.bulkCreate(orderItems);
        await userCart.setProducts([]); 

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await models.Order.findAll({ where: { userId: req.user.id } });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving orders' });
    }
};
