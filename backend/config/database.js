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

  const connectDB = async() => {
    try {
      await db.authenticate() 
      console.log("DB Connected");
    } catch (err) {
      console.log("DB Error", err);
    }
  }

  connectDB();
  
module.exports = db;