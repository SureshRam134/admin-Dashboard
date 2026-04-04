const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { response } = require('../utils/response')

const AdminHandleFun = async (req, res, next) => {
    try {
        const Headers = req.headers.authorization
        console.log(Headers, 8979);
        
        if (!Headers)return response(res, 401,  false,"Admin cannot login")
        const token = Headers.split("Bearer ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (![2].includes(decoded.role)) return response(res,403,  false,"Access denied")
        next();
    } catch (error) {
        return response(res, 500, false, "Serverrr error :", error)
    }
}

const authorizationFunction = async (req, res, next) => {
    const Headers = req.headers.authorization
    if (!Headers) return response(res, 401, false, "Token not found")
    const token = Headers.split("Bearer ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
        req.userId = decoded.id
        next();
    } catch (error) {
        return response(res, 500, false, "server error", error)
    }
}

const userVerifyOtpFun = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        if (!email || !otp) return response(res, 400, "All feilds required")
        if (otp.length < 6 || otp.length > 6) return response(res, 400, "Otp length 6 number only")
        const user = await User.findOne({ where: { otp } })
        if (!user) return response(res, 400, "Invaild otp, please reset opt")
        if (email !== user.email) return response(res, 400, "Please check your email")
        if (new Date() > new Date(user.expires_otp)) return response(res, 400, "Opt expired")
        next();
    } catch (error) {
        return response(res, 500, false, "server error: ", error)
    }
}

module.exports = { AdminHandleFun, authorizationFunction, userVerifyOtpFun }