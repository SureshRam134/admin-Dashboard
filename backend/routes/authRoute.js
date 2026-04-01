const express = require('express');
const { registerHandelFunction, loginHandelFunction, protectUserFun, forgotHandelFunction, userVerifyOtpFunction, resetPasswordFunction } = require('../controllers/authControler');
const { authorizationFunction } = require('../middleware/authorization');

const authRoute = express.Router();
authRoute.post('/register', registerHandelFunction)
authRoute.post('/login', loginHandelFunction)
authRoute.post('/protect',authorizationFunction , protectUserFun)
authRoute.post('/forgot', forgotHandelFunction)
authRoute.post('/otp', userVerifyOtpFunction)
authRoute.post('/resetpassword', resetPasswordFunction)


module.exports= authRoute;