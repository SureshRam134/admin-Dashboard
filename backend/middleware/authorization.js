const jwt = require('jsonwebtoken')
// require('dotenv').config();

const authorizationFunction = async(req, res, next) => {
    const Headers = req.headers.authorization
    if(!Headers) return res.status(404).json("Token not found")
    const token = Headers.split("Bearer ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXP})  
        console.log(decoded);
        
        req.userId=decoded.id
        next();

    } catch (error) {
        return res.status(400).json({message:"token invaild"})
    }
}

module.exports = {authorizationFunction}