'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('TransactionDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      txnType: { type: Sequelize.STRING }, //(debit | credit)
      source:{type:Sequelize.STRING}, //(card|account)
      amount: { type: Sequelize.STRING, defaultValue: '' },
      walletTxnId: { type: Sequelize.INTEGER },
      txnId: { type: Sequelize.STRING }, //to be updated after payment is successfull
      debitAccountId:{type:Sequelize.INTEGER}, //foreign key of user cards or user account
      creditAccountId:{type:Sequelize.INTEGER}, //foreign key of credit card or user account
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
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('TransactionDetails');
     */
     await queryInterface.dropTable('TransactionDetails');
  }
};
