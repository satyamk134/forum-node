'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    class UserCards extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    UserCards.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: { type: Sequelize.INTEGER },
        cardNumber: { type: Sequelize.STRING },
        cvv: { type: Sequelize.STRING, defaultValue: '' },
        nameOnCard: { type: Sequelize.STRING },
        expiryMonth: { type: Sequelize.INTEGER },
        expiryYear: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
        }

    },
        {
            sequelize,
            modelName: 'UserCards',
        });
    return UserCards;
};