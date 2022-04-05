'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    class TransactionDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    TransactionDetails.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        txnType: { type: Sequelize.STRING }, //(debit | credit)
        source: { type: Sequelize.STRING }, //(card|account)
        amount: { type: Sequelize.STRING, defaultValue: '' },
        walletTxnId: { type: Sequelize.INTEGER },
        txnId: { type: Sequelize.STRING }, //to be updated after payment is successfull
        debitAccountId: { type: Sequelize.INTEGER }, //foreign key of user cards or user account
        creditAccountId: { type: Sequelize.INTEGER }, //foreign key of credit card or user account
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
            modelName: 'TransactionDetails',
        });
    return TransactionDetails;
};