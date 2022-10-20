'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName:{ type:Sequelize.STRING },
      lastName:{ type:Sequelize.STRING },
      address:{ type:Sequelize.STRING },
      city:{ type:Sequelize.STRING },
      pincode:{ type:Sequelize.STRING },
      mobileNumber:{ type:Sequelize.STRING },
      userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users', // 'Movies' would also work
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('MerchantServiceDetails');
     */
     await queryInterface.dropTable('Addresses');
  }
};
