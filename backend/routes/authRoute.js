const express = require('express');
const { loginHandelFunction, protectUserFun, forgotHandelFunction, resetPasswordFunction } = require('../controllers/authControler');
const { authorizationFunction, userVerifyOtpFun } = require('../middleware/authorization');

const authRoute = express.Router();
// authRoute.post('/register',chechAuthRegister, registerHandelFunction)
authRoute.post('/login', loginHandelFunction)
authRoute.post('/protect',authorizationFunction , protectUserFun)
authRoute.post('/forgot', forgotHandelFunction)
authRoute.post('/resetpassword', userVerifyOtpFun ,resetPasswordFunction)

module.exports= authRoute;