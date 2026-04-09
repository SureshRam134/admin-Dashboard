const express = require('express');
const { loginHandelFunction, forgotHandelFunction, resetPasswordFunction, registerHandelFunction } = require('../controllers/authControler');
const { userVerifyOtpFun } = require('../middleware/authorization');

const authRoute = express.Router();
authRoute.post('/register', registerHandelFunction)
authRoute.post('/login', loginHandelFunction)
authRoute.post('/forgot', forgotHandelFunction)
authRoute.post('/resetpassword', userVerifyOtpFun ,resetPasswordFunction)

module.exports= authRoute;