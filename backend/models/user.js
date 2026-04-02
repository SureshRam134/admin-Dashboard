// const sequelize = require('sequelize')
const { DataTypes } = require('sequelize')
const db = require('../config/database')


const user = db.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    otp: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },

    expires_otp: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
    { tableName: "users", timestamps: true }

);

module.exports = user;

