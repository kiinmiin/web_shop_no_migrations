const Sequelize = require('sequelize');

const sequelize = new Sequelize('web_shop2', 'root', 'qwerty', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;