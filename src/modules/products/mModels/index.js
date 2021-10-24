const dbConfig = require("../../../configs/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.products = require("./Product.model.js")(sequelize, Sequelize);
db.carts = require("./Cart.model.js")(sequelize, Sequelize);
db.users = require("../../auth/models/user.model.js")(sequelize, Sequelize);

//db.carts.hasMany(db.products);
db.products.hasMany(db.carts);
db.users.hasMany(db.carts);
db.carts.belongsTo(db.products);
db.carts.belongsTo(db.users);
sequelize.sync();
module.exports = db;