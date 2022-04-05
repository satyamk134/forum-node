'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  };
  Merchant.init({
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

  },
    {
      sequelize,
      modelName: 'Merchant',
    });
  return Merchant;
};