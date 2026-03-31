const express = require('express')
require('dotenv').config()
const cors = require('cors')
require('./config/initDB')
const authRoute = require('./routes/authRoute')

const server = express();
const PORT = process.env.PORT || 4000
server.use(cors());
server.use(express.json());
server.use('/api/user', authRoute)

server.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
})