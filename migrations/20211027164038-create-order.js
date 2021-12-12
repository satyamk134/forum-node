'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status : { type: Sequelize.STRING},
      expectedPickupTime: { type: Sequelize.STRING},
      actulaPickupTime:{type: Sequelize.STRING},
      expectedDeliveryTime:{type:Sequelize.STRING},
      actualDeliveryTime:{type:Sequelize.STRING},
      agentAssigned:{type:Sequelize.STRING},
      paymentStatus:{type:Sequelize.BOOLEAN},
      userId:{type:Sequelize.INTEGER},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};