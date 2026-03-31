const express = require('express');
const { registerHandelFunction, loginHandelFunction, protectUserFun, forgetHandelFunction } = require('../controllers/authControler');
const { authorizationFunction } = require('../middleware/authorization');

const authRoute = express.Router();
authRoute.post('/register', registerHandelFunction)
authRoute.post('/login', loginHandelFunction)
authRoute.post('/protect',authorizationFunction , protectUserFun)
authRoute.post('/forget', forgetHandelFunction)



module.exports= authRoute;