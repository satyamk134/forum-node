'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //models.User.hasMany(Order);
      Order.belongsTo(models.User);
      models.User.hasMany(Order);

      Order.hasMany(models.OrderWishmaster);
      models.User.hasMany(models.OrderWishmaster,{foreignKey:"agentId"})
    }
  };
  Order.init({
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
    userId:{type:Sequelize.INTEGER}
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};