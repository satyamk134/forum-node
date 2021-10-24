
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Product", {
      url : { type: Sequelize.STRING},
      cateogory: { type: Sequelize.STRING},
      productName: { type: Sequelize.STRING},
      productId: {type: Sequelize.STRING},
      listingPrice: {type: Sequelize.STRING},
      sellingPrice: {type: Sequelize.STRING},
      disount: {type: Sequelize.STRING},
      brand: {type: Sequelize.STRING},
      description: {type: Sequelize.STRING},
      rating: {type: Sequelize.STRING},
      reviews: {type: Sequelize.STRING},
      frontImage: {type: Sequelize.STRING},
      backImage: {type: Sequelize.STRING},
      leftImage: {type: Sequelize.STRING},
      rightImage: {type: Sequelize.STRING},
      topImage: {type: Sequelize.STRING},
      bottomImage: {type: Sequelize.STRING},
    });
    return Product;
};