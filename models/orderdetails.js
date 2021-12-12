'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.hasMany(OrderDetails);
      
     
    }
  };
  OrderDetails.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    orderId:{
      type:Sequelize.INTEGER,
    },
    count: {
      type: Sequelize.INTEGER
    },
    clothType:{
      type: Sequelize.STRING
    },
    unit:{
      type:Sequelize.STRING
    }

  },
    {
      sequelize,
      modelName: 'OrderDetails',
    });
  return OrderDetails;
};