const express = require('express');
const { loginHandelFunction, protectUserFun, forgotHandelFunction, resetPasswordFunction, registerHandelFunction } = require('../controllers/authControler');
const { authorizationFunction, userVerifyOtpFun, AdminHandleFun } = require('../middleware/authorization');

const authRoute = express.Router();
authRoute.post('/register', AdminHandleFun, registerHandelFunction)
authRoute.post('/login', loginHandelFunction)
authRoute.post('/protect',authorizationFunction , protectUserFun)
authRoute.post('/forgot', forgotHandelFunction)
authRoute.post('/resetpassword', userVerifyOtpFun ,resetPasswordFunction)

module.exports= authRoute;