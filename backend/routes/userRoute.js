const express = require('express');
const { AdminHandleFun } = require('../middleware/authorization');
const { getUserFunction } = require('../controllers/userControler');

const userRoute = express.Router();
userRoute.get('/getuser',AdminHandleFun ,getUserFunction)


module.exports = userRoute