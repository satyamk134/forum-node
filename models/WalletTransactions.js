'use strict';
const { model } = require('mongoose');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    class WalletTransactions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            WalletTransactions.belongsTo(models.Wallets,{foreignKey:'walletId'})
        }
    };
    WalletTransactions.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        walletId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Wallets',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        source: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        amount: { type: Sequelize.FLOAT(11, 4) },
        action: { type: Sequelize.STRING }, //can be add or sub
        previousBalance: {
            type: Sequelize.FLOAT(11, 4)
        },
        updatedBalance: {
            type: Sequelize.FLOAT(11, 4)
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    },
        {
            sequelize,
            modelName: 'WalletTransactions',
        });
    return WalletTransactions;
};