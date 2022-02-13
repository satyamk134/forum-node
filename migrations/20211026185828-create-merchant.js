'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Merchants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name : { type: Sequelize.STRING},
      addessLineOne: {type: Sequelize.STRING,defaultValue:'HSR Layout'},
      addessLineTwo: {type: Sequelize.STRING,defaultValue:'Bangalore'},
      pincode:{type: Sequelize.STRING,defaultValue:"560102"},
      mobile:{type:Sequelize.STRING, defaultValue:"9999911111"},
      shopImage:{ type: Sequelize.STRING},
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
    await queryInterface.dropTable('Merchants');
  }
};
