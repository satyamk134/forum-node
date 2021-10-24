
module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("Cart", {
      count:{ type:Sequelize.INTEGER},
      total:{type:Sequelize.INTEGER}
      
    });
    return Cart;
};