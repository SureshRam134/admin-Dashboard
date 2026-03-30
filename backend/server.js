const express = require('express')
require('dotenv').config()
const cors = require('cors')


const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log("Server running");
})