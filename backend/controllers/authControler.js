const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user');
const checkMail = require('../services/emailAccess');
const { response } = require('../utils/response');

const registerHandelFunction = async (req, res) => {
    const { name, email, password, roleId } = req.body;
    try {
        if (!name || !email || !password) return response(res, 400, false,"All feilds required")
        if (!/^[a-zA-Z0-9.#+-]+@[a-zA-z.+-]+\.[a-zA-z]{2,}$/.test(email)) return response(res, 400, false, "Email not vaild formet")
        if (!isNaN(email)) return response(res, 400, false, "Email only access")
        if (!/(?=.*[a-z])/.test(password)) return response(res, 400, false, "Must have one small letter")
        if (!/(?=.*[A-Z])/.test(password)) return response(res, 400, false, "Must have one capital letter")
        if (!/(?=.*[@#$%&!*])/.test(password)) return response(res, 400, false, "Must have one special character")
        if (!/(?=.*\d)/.test(password)) return response(res, 400, false, "Must have one number")
        if (password.length < 8) return response(res, 400, false, "Must have 8 character")
        const exist = await User.findOne({ where: { email } });
        if (exist) return response(res, 400, false, "User already exists")
        const hashpassword = await bcrypt.hash(password, 10)
        const isEmail = email.trim().toLowerCase();
        await User.create({
            roleId,
            name,
            email: isEmail,
            password: hashpassword,
        });
        return response(res, 200, true, "SuccessFull Registered")
    } catch (error) {
        return response(res, 500, false, "server error :", error.message)
    }
}

const loginHandelFunction = async (req, res) => {
    const { email, password, roleId } = req.body;
    try {
        if (!email || !password ) return response(res, 400, false, "All feilds required")
        const user = await User.findOne({ where: { email } })
        if (!user) return response(res, 400, false, "Email invaild")
        // if (user.roleId !== roleId) return response(res, 400, false, "Check vaild domain")
        const vaildPassword = await bcrypt.compare(password, user.password)
        if (!vaildPassword) return response(res, 400, false, "Password invaild")
        const token = jwt.sign({ id: user.id, role:user.roleId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
        return response(res, 200, true, "Successfully Login", token)
    } catch (error) {
        if (error) response(res, 500, false, "server error :", error.message)
    }
}

const forgotHandelFunction = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) return response(res, 400, false, "No email")
        else if (!/^[a-zA-Z0-9.#+-]+@[a-zA-z.+-]+\.[a-zA-z]{2,}$/.test(email)) return response(res, 400, false, "Email not vaild formet")
        const user = await User.findOne({ where: { email } })
        if (!user) return response(res, 404, false, "User not found")
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const expires_otp = new Date(Date.now() + 5 * 60 * 1000);
        if (!otp) return response(res, 404, false, "otp not created")
        if (otp.length < 6 || otp.length > 6) return response(res, 400, false, "Otp length 6 only")
        await User.update({ otp, expires_otp }, { where: { email } })
        
        const transporter = checkMail(res)
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Trackdo OTP Code',
            text: `Your OTP is: ${otp} don't share it...!`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return response(res, 500, false, "mail error:", err.message)
            const payload = {
                email : email,
                otp: otp
        }        
            return response(res, 200, true, "Trackdo otp send to your mail", payload)
        })
    } catch (error) {
        return response(res, 500, false, "server error: ", error.message)
    }
}

const resetPasswordFunction = async (req, res) => {
    const { email, password } = req.body
    if (!password || !email) return response(res, 400, false, "All feilds required")
    if (!/(?=.*[a-z])/.test(password)) return response(res, 400, false, "Must have one small letter")
    if (!/(?=.*[A-Z])/.test(password)) return response(res, 400, false, "Must have one capital letter")
    if (!/(?=.*[@#$%&!*])/.test(password)) return response(res, 400, false, "Must have one special character")
    if (!/(?=.*\d)/.test(password)) return response(res, 400, false, "Must have one number")
    if (password.length < 8) return response(res, 400, false, "Must have 8 character")
    const hashpassword = await bcrypt.hash(password, 10)
    await User.update({ password: hashpassword, otp:'', expires_otp:''}, { where: { email } })
    return response(res, 200, true, "SuccessFully password changed")
}

const protectUserFun = async (req, res) => {
    const id = req.userId;
    return response(res, 200, true, "User Protected", id)
}

module.exports = { registerHandelFunction, loginHandelFunction, protectUserFun, forgotHandelFunction, resetPasswordFunction }