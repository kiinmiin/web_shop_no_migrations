const Product = require('../models/product');
const Cart = require('../models/cart');

class shopController {
    async removeProduct(req, res) {
        const productId = req.params.id; 
        const userCart = await req.user.getCart();
        
        const cartItems = await userCart.getProducts({ where: { id: productId } });
        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'Product not found in cart.' });
        }

        const cartItem = cartItems[0];
        if (cartItem.cartItem.quantity > 1) {
            const newQuantity = cartItem.cartItem.quantity - 1;
            await cartItem.cartItem.update({ quantity: newQuantity });
            console.log(`Decreased quantity of product with ID ${productId} in cart.`);
            return res.status(200).json({
                message: 'Product quantity decreased in cart.'
            });
        }

        await userCart.removeProduct(cartItem);
        console.log(`Product with ID ${productId} removed from cart.`);
        res.status(200).json({
            message: 'Product removed from cart successfully.'
        });
    }

    async getAllProducts(req, res) {
        const products = await Product.findAll();
        console.log(products);
        res.status(201).json({
            products: products
        });
    }
    
    async getCart(req, res) {
        const userCart = await req.user.getCart();
        console.log(userCart);
        const cartProducts = await userCart.getProducts();
        res.status(201).json({
            products: cartProducts
        });
    }
    
    async addProduct(req, res) {
        const productId = req.params.id; 
        const userCart = await req.user.getCart();
        
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItems = await userCart.getProducts({ where: { id: productId } });
        if (cartItems.length > 0) {
            const cartItem = cartItems[0];
            const newQuantity = cartItem.cartItem.quantity + 1;
            await cartItem.cartItem.update({ quantity: newQuantity });
            return res.status(200).json({ message: 'Product quantity updated in cart.' });
        }

        await userCart.addProduct(product, { through: { quantity: 1 } });
        console.log(`Product with ID ${productId} added to cart.`);
        res.status(201).json({
            message: 'Product added to cart successfully.'
        });
    }
}

module.exports = new shopController();
