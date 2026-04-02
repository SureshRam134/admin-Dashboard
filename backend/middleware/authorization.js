const jwt = require('jsonwebtoken')
const { getUserOtp } = require('../models/authQuery')

const chechAuthRegister = (req, res, next) => {
    const {roleId} = req.body
    try {
        const role = Number(roleId)
        const controler =[1,2]
        if(!controler.includes(role)) return res.status(403).json({message:"Access Denied"})
        req.currentRole = role
        next()
    } catch (error) {
        return res.status(500).json("Server error :", error )
    }
}

const authorizationFunction = async (req, res, next) => {
    const Headers = req.headers.authorization
    if (!Headers) return res.status(404).json("Token not found")
    const token = Headers.split("Bearer ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
        console.log(decoded);
        req.userId = decoded.id
        next();

    } catch (error) {
        return res.status(400).json({ message: "token invaild" })
    }
}


const userVerifyOtpFun = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        if (!email || !otp) return res.status(400).json("All feilds required")
        if (otp.length < 6 || otp.length > 6) return res.status(400).json("Otp length 6 number only")
        getUserOtp([otp], (err, result) => {
            if (err) return res.status(500).json("db error :", err)
            if (result.length === 0) return res.status(400).json({ message: "Invaild otp, please reset opt" })
            const data = result[0]
            if (email !== data.email) return res.status(400).json({ message: "Please check your email" })
            if (new Date() > new Date(data.expires_otp)) return res.status(400).json({ message: "Opt expired" })
            next();
        })
    } catch (error) {
        return res.status(500).json("server error: ", error)
    }
}

module.exports = { chechAuthRegister, authorizationFunction, userVerifyOtpFun }