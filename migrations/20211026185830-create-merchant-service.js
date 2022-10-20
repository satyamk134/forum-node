'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MerchantServices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name : { type: Sequelize.STRING},
      unit: { type: Sequelize.STRING},
      tat: { type:Sequelize.STRING},
      available:{ type:Sequelize.BOOLEAN},
      hasParticulars:{
        type:Sequelize.BOOLEAN
      },
      price: { type: Sequelize.INTEGER },
      merchantId:{
        type:Sequelize.INTEGER,
        references: {
          model: 'Merchants', // 'Movies' would also work
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MerchantServices');
  }
};
