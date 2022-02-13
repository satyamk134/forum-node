'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class MerchantServices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MerchantServices.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name : { type: Sequelize.STRING},
    price: { type: Sequelize.INTEGER},
    unit: { type: Sequelize.STRING},
    tat: { type:Sequelize.STRING},
    available:{ type:Sequelize.BOOLEAN},
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
      modelName: 'MerchantServices',
    });
  return MerchantServices;
};