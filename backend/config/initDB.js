const {registerTable} = require('../models/dbTableQuery')

registerTable ((err) => {
    if(err) return console.log("Register table not created");
    return console.log("Register table created");
})

