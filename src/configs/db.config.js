module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "12345",
    DB: "shoppers",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 9000
    }
  };