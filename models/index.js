const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Product = require('./product');
const Order = require('./order');
const OrderItem = require('./order-items');
const Cart = require('./cart');
const CartItem = require('./cart-item');
const User = require('./user');

Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsToMany(Product, { through: 'CartItem', foreignKey: 'cartId' });


module.exports = {
    sequelize,
    Product,
    Order,
    OrderItem,
    Cart,
    CartItem,
    User
};
