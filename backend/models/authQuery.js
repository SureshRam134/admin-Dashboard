const db = require("../config/database")


const regDataInsert = (data, callback) => {
    const sql = "INSERT INTO register (`roleId`, `name`, `email`, `password`    ) VALUES (?,?,?,?)"
    db.query(sql, data, callback)
}
const getRegData = (data, callback) => {
    const sql = "SELECT * FROM register WHERE email = ?"
    db.query(sql,data, callback)
}
const userForgotPassword = (data, callback) => {
    const sql = "SELECT * FROM register WHERE email = ?"
    db.query(sql, data, callback)
}
const userOTP = (data, callback) => {
    const sql = "INSERT INTO verify_userOTP (`email`, `otp`    ) VALUES (?,?)"
    db.query(sql, data, callback)
}
const getUserOtp = (data, callback) => {
    const sql ="SELECT * FROM verify_userOTP WHERE otp = ?"
    db.query(sql, data, callback)
}
const resetPassword = (data, callback) => {
    const sql="UPDATE register SET password = ? WHERE email = ?"
    db.query(sql, data, callback)
}


module.exports= {regDataInsert, getRegData,userForgotPassword, userOTP, getUserOtp, resetPassword}