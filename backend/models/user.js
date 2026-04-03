// const sequelize = require('sequelize')
const { DataTypes } = require('sequelize')
const db = require('../config/database')


const User = db.define("User", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },

    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },

    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate:{
            isEmail:true,
            notEmpty:true,
        }
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate:{
            len:[8,100],
            notEmpty:true,
        }
    },

    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },

    otp: {
        type: DataTypes.STRING(6),
        allowNull: true,
    },

    expires_otp: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    // createdAt: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // },

    // updatedAt: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // },
},
    { tableName: "users", timestamps: true }

);

module.exports = User;

