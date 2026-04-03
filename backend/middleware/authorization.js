const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { wrongResponse, errorResponse } = require('../utils/response')

const chechAuthRegister = (req, res, next) => {
    const { roleId } = req.body
    try {
        const role = Number(roleId)
        // const controler = [1, 2]
        // if (!controler.includes(role)) return wrongResponse(res, 403, "Access Denied" )
        if (role !== 2) return wrongResponse(res, 403, "Access Denied" )
        // req.currentRole = role
        next();
    } catch (error) {
        return  errorResponse(res, 500, "Server error :", error ) 
    }
}

const authorizationFunction = async (req, res, next) => {
    const Headers = req.headers.authorization
    if (!Headers) return wrongResponse(res, 404, "Token not found" ) 
    const token = Headers.split("Bearer ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
        console.log(decoded);
        req.userId = decoded.id
        next();
    } catch (error) {
        return errorResponse(res, 500, "server error", error )
    }
}

const userVerifyOtpFun = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        if (!email || !otp) return wrongResponse(res, 400, "All feilds required") 
        if (otp.length < 6 || otp.length > 6) return wrongResponse(res, 400, "Otp length 6 number only") 
        const user = await User.findOne({ where: { otp } })
        if (!user) return wrongResponse(res, 400, "Invaild otp, please reset opt") 
        if (email !== user.email) return wrongResponse(res, 400, "Please check your email") 
        if (new Date() > new Date(user.expires_otp)) return wrongResponse(res, 400, "Opt expired") 
        next();
    } catch (error) {
        return errorResponse(res, 500, "server error: ", error) 
    }
}

module.exports = { chechAuthRegister, authorizationFunction, userVerifyOtpFun }