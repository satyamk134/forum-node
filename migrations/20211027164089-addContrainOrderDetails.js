'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


   
    return await queryInterface.addConstraint('OrderDetails', {
      fields: ['orderId'],
      type: 'foreign key',
      name: 'orderId',
      references: { //Required field
        table: 'Orders',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
