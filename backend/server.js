const express = require('express')
require('dotenv').config()
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const { admin_AuthRoute } = require('./routes/adminAuthRoute')
const userRoute = require('./routes/userRoute')

const server = express();
const PORT = process.env.PORT || 4000
server.use(cors({origin:'http://localhost:5173', credentials:true}));
server.use(express.json());
// server.use('/api/super_admin', superAdmin_AuthRoute)
// server.use('/api/admin', admin_AuthRoute)
server.use('/api/user', authRoute)
server.use('/api/user', userRoute)
server.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
})