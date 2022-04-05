'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('UserCards', {
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
      expiryMonth:{type: Sequelize.INTEGER},
      expiryYear:{
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
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('UserCards');
     */
     await queryInterface.dropTable('UserCards');
  }
};
