'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    class Addresses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasMany(Addresses);
            Addresses.belongsTo(models.User);


        }
    };
    Addresses.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        city: { type: Sequelize.STRING },
        pincode: { type: Sequelize.STRING },
        mobileNumber: { type: Sequelize.STRING },
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

    },
        {
            sequelize,
            modelName: 'Addresses',
        });
    return Addresses;
};