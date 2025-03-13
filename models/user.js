const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING, 
    email: Sequelize.STRING,
});

User.associate = (models) => {
    User.hasOne(models.Cart, { foreignKey: 'userId' });
};

module.exports = User;
