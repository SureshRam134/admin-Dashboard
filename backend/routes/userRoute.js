const express = require('express');
const { AdminHandleFun } = require('../middleware/authorization');
const { getUserFunction, updateUserFunction, deleteUserFunction } = require('../controllers/userControler');

const userRoute = express.Router();
userRoute.get('/getuser',AdminHandleFun ,getUserFunction)

userRoute.put('/updateuser:id', updateUserFunction)
userRoute.patch('/deleteuser:id' ,deleteUserFunction)
module.exports = userRoute