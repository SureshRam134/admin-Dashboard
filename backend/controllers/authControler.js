const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user');
const checkMail = require('../services/emailAccess');
const { wrongResponse, errorResponse, SuccessResponse } = require('../utils/response');

const registerHandelFunction = async (req, res) => {
    const { name, email, password, roleId } = req.body;
    try {
        if (!name || !email || !password) return wrongResponse(res, 400, "All feilds required")
        if (!/^[a-zA-Z0-9.#+-]+@[a-zA-z.+-]+\.[a-zA-z]{2,}$/.test(email)) return wrongResponse(res, 400, "Email not vaild formet")
        if (!isNaN(email)) return wrongResponse(res, 400, "Email only access")
        if (!/(?=.*[a-z])/.test(password)) return wrongResponse(res, 400, "Must have one small letter")
        if (!/(?=.*[A-Z])/.test(password)) return wrongResponse(res, 400, "Must have one capital letter")
        if (!/(?=.*[@#$%&!*])/.test(password)) return wrongResponse(res, 400, "Must have one special character")
        if (!/(?=.*\d)/.test(password)) return wrongResponse(res, 400, "Must have one number")
        if (password.length < 8) return wrongResponse(res, 400, "Must have 8 character")
        const exist = await User.findOne({ where: { email } });
        if (exist) return wrongResponse(res, 400, "User already exists")
        const hashpassword = await bcrypt.hash(password, 10)
        const isEmail = email.trim().toLowerCase();
        await User.create({
            roleId,
            name,
            email: isEmail,
            password: hashpassword,
        });
        return SuccessResponse(res, 200, "SuccessFull Registered")
    } catch (error) {
        return errorResponse(res, 500, "server error :", error.message)
    }
}

const loginHandelFunction = async (req, res) => {
    const { email, password, roleId } = req.body;
    try {
        if (!email || !password || !roleId) return wrongResponse(res, 400, "All feilds required")
        const user = await User.findOne({ where: { email } })
        if (!user) return wrongResponse(res, 400, "Email invaild")
        if (user.roleId !== roleId) return wrongResponse(res, 400, "Check vaild domain")
        const vaildPassword = await bcrypt.compare(password, user.password)
        if (!vaildPassword) return wrongResponse(res, 400, "Password invaild")
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
        return SuccessResponse(res, 200, "Successfully Login", token)
    } catch (error) {
        if (error) errorResponse(res, 500, "server error :", error.message)
    }
}

const forgotHandelFunction = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) return wrongResponse(res, 400, "No email")
        else if (!/^[a-zA-Z0-9.#+-]+@[a-zA-z.+-]+\.[a-zA-z]{2,}$/.test(email)) return wrongResponse(res, 400, "Email not vaild formet")
        const user = await User.findOne({ where: { email } })
        if (!user) return wrongResponse(res, 404, "User not found")
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const expires_otp = new Date(Date.now() + 5 * 60 * 1000);
        if (!otp) return wrongResponse(res, 404, "otp not created")
        if (otp.length < 6 || otp.length > 6) return wrongResponse(res, 400, "Otp length 6 only")
        console.log(1)
        await User.update({ otp, expires_otp }, { where: { email } })
        const transporter = checkMail(res)

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Trackdo OTP Code',
            text: `Your OTP is: ${otp} don't share it...!`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return errorResponse(res, 500, "mail error:", err.message)
            return wrongResponse(res, 200, "Trackdo otp send to your mail ")
        })
    } catch (error) {
        return errorResponse(res, 500, "server error: ", error.message)
    }
}

const resetPasswordFunction = async (req, res) => {
    const { email, password } = req.body
    if (!password || !email) return wrongResponse(res, 400, "All feilds required")
    if (!/(?=.*[a-z])/.test(password)) return wrongResponse(res, 400, "Must have one small letter")
    if (!/(?=.*[A-Z])/.test(password)) return wrongResponse(res, 400, "Must have one capital letter")
    if (!/(?=.*[@#$%&!*])/.test(password)) return wrongResponse(res, 400, "Must have one special character")
    if (!/(?=.*\d)/.test(password)) return wrongResponse(res, 400, "Must have one number")
    if (password.length < 8) return wrongResponse(res, 400, "Must have 8 character")
    const hashpassword = await bcrypt.hash(password, 10)
    await User.update({ password: hashpassword }, { where: { email } })
    return SuccessResponse(res, 200, "SuccessFully password changed")
}

const protectUserFun = async (req, res) => {
    const id = req.userId;
    return SuccessResponse(res, 200, "User Protected", id)
}

module.exports = { registerHandelFunction, loginHandelFunction, protectUserFun, forgotHandelFunction, resetPasswordFunction }