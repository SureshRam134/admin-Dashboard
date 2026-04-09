const express = require('express');
const { AdminAllowFun } = require('../middleware/authorization');
const { getUserFunction, updateUserFunction, deleteUserFunction, addUserFunction } = require('../controllers/userControler');


const userRoute = express.Router();
userRoute.get('/getuser',AdminAllowFun ,getUserFunction)
userRoute.post('/adduser', AdminAllowFun, addUserFunction)
userRoute.put('/updateuser/:id', updateUserFunction)
userRoute.patch('/deleteuser/:id' ,deleteUserFunction)
module.exports = userRoute