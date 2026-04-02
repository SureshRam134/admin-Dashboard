require("dotenv").config();
const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

db.authenticate()
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Error", err));
  
module.exports = db;