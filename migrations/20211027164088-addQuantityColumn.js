'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('OrderDetails', 
        'unit',
        Sequelize.STRING
    )
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
