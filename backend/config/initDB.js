const {registerTable, verifyUserOTP} = require('../models/dbTableQuery')

registerTable ((err) => {
    if(err) return console.log("Register table not created");
    return console.log("Register table created");
})
verifyUserOTP ((err) => {
    if(err) return console.log("otp_verification table not created");
    return console.log("otp_verification table created");
})


// otp_verification