const db = require("../config/database")


const registerTable = (callback) => {
    const sql = "CREATE TABLE IF NOT EXISTS register (id INT AUTO_INCREMENT PRIMARY KEY, roleId INT NOT NULL,  name VARCHAR(150) NOT NULL, email VARCHAR(150) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, active BOOLEAN NOT NULL DEFAULT FALSE, INDEX(roleId))";
    db.query(sql, callback)
}


const verifyUserOTP = (callback) => {
    // otp_verification
    const sql = "CREATE TABLE IF NOT EXISTS verify_userOTP (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(150) ,otp VARCHAR(15))"
    db.query(sql, callback)
}
module.exports= {registerTable, verifyUserOTP}