'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('MerchantServiceDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serviceId: { type: Sequelize.INTEGER, 
        references: {
          model: 'MerchantServices', // 'Movies' would also work
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, //(debit | credit)
      cloth:{type:Sequelize.STRING}, //shirt, pant, jeans
      unit:{type:Sequelize.STRING}, //kg, peice
      price: { type: Sequelize.INTEGER }, //(card|account)
      discount:{type:Sequelize.INTEGER, defaultValue:0},
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
     * await queryInterface.dropTable('MerchantServiceDetails');
     */
     await queryInterface.dropTable('MerchantServiceDetails');
  }
};
