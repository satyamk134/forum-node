'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class OrderWishmaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderWishmaster.belongsTo(models.Order);
      models.User.hasMany(OrderWishmaster,{foreignKey: 'agentId'})
    }
  };
  OrderWishmaster.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    agentId : { type: Sequelize.STRING},
    orderId: { type: Sequelize.STRING},
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'OrderWishmaster',
  });
  return OrderWishmaster;
};