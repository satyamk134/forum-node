'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emailId:{
        type: Sequelize.STRING
      },
      password:{
        type: Sequelize.STRING
      },
      lastName:{
        type: Sequelize.STRING
      },
      firstName:{
        type: Sequelize.STRING
      },
      role:{
        type: Sequelize.STRING, 
        defaultValue:"customer"
      },
      address:{
        type: Sequelize.STRING
      },
      mobileNo:{
        type: Sequelize.STRING
      },
      provider:{
        type: Sequelize.STRING
      },
      isAvailable:{
        type:Sequelize.STRING
      },
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
    await queryInterface.dropTable('Users');
  }
};