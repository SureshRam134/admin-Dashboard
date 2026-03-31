const db = require("../config/database")


const regDataInsert = (data, callback) => {
    const sql = "INSERT INTO register (`roleId`, `name`, `email`, `password`    ) VALUES (?,?,?,?)"
    db.query(sql, data, callback)
}
const getRegData = (data, callback) => {
    const sql = "SELECT * FROM register WHERE email = ?"
    db.query(sql,data, callback)
}

module.exports= {regDataInsert, getRegData}