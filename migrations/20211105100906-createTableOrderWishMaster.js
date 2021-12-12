'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderWishmasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      agentId : { type: Sequelize.INTEGER},
      orderId: { type: Sequelize.INTEGER},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
    await queryInterface.addConstraint('OrderWishmasters', {
      fields: ['orderId'],
      type: 'foreign key',
      
      references: { //Required field
        table: 'Orders',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('OrderWishmasters', {
      fields: ['agentId'],
      type: 'foreign key',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderWishmaster');
  }
};