const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()
const {  getRegData, userForgotPassword, userOTP, resetPassword } = require('../models/authQuery');
const User = require('../models/user');

const registerHandelFunction = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name ||  !email || !password) return res.status(400).json("All feilds required")
        if (!/^[a-zA-Z0-9.#+-]+@[a-zA-z.+-]+\.[a-zA-z]{2,}$/.test(email)) return res.status(400).json({ message: "Email not vaild formet" })
        if (!isNaN(email)) return res.status(400).json({ message: "Email only access" })
        if (!/(?=.*[a-z])/.test(password)) return res.status(400).json({ message: "Must have one small letter" })
        if (!/(?=.*[A-Z])/.test(password)) return res.status(400).json({ message: "Must have one capital letter" })
        if (!/(?=.*[@#$%&!*])/.test(password)) return res.status(400).json({ message: "Must have one special character" })
        if (!/(?=.*\d)/.test(password)) return res.status(400).json({ message: "Must have one number" })
        const exist = await User.findOne({ where: { email } });
        if (exist) return res.status(400).json({ message: "User already exists" });
        if (password.length < 8) return res.status(400).json({ message: "Must have 8 character" })
        const hashpassword = await bcrypt.hash(password, 10)
        const roleId = Number(req.currentRole) 
        const user = await User.create({
            roleId,
            name,
            email,
            password: hashpassword,

        });
        return res.status(200).json({ message: "SuccessFull Registered", user })
    } catch (error) {
        return res.status(500).json("server error :", error)
    }
}


const loginHandelFunction = async (req, res) => {
    const { email, password, roleId } = req.body;
    try {
        if (!email || !password || !roleId) return res.status(400).json("All feilds required")
        getRegData([email], async (err, result) => {
            try {
                if (err) return res.status(500).json("DB error :", err)
                const data = result[0]
                if (!data) return res.status(400).json({ message: "Email invaild" })
                if (data.roleId !== roleId) return res.status(400).json({ message: "Check vaild domain" })
                const chechPassword = await bcrypt.compare(password, data.password)
                if (!chechPassword) return res.status(400).json({ message: "Password invaild" })
                const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
                return res.status(200).json({ message: "Successfully Login", token })
            } catch (error) {
                if (error) return res.status(500).json("server error :", error)
            }
        })

    } catch (error) {
        if (error) return res.status(500).json("server error :", error)
    }

}

const forgotHandelFunction = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) return res.status(400).json("No email")
        else if (!/^[a-zA-Z0-9.#+-]+@[a-zA-z.+-]+\.[a-zA-z]{2,}$/.test(email)) return res.status(400).json({ message: "Email not vaild formet" })
        userForgotPassword([email], (err, result) => {
            if (err) return res.status(500).json("db error :", err)
            if (result.length === 0) return res.status(404).json({ message: "User not found" })
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            const expires_otp = new Date(Date.now() + 5 * 60 * 1000);
            if (!otp) return res.status(404).json({ message: "otp not created" })
            if (otp.length < 6 || otp.length > 6) return res.status(400).json("Otp length 6 only")

            userOTP([otp, expires_otp, email], (err) => {
                if (err) return res.status(500).json("user otp db error: ", err)
            })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ss9477157@gmail.com',
                    pass: 'bmmwkadbdmzpagdr',
                }
            })
            const mailOptions = {
                from: 'ss9477157@gmail.com',
                to: email,
                subject: 'Trackdo OTP Code',
                text: `Your OTP is: ${otp}`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) return res.status(500).json('server error: ', err)
                return res.status(200).json({ message: "Trackdo otp send to your mail " })
            })

        })
    } catch (error) {
        return res.status(500).json("server error: ", error)
    }

}

const resetPasswordFunction = async (req, res) => {
    const { email, password } = req.body
    if (!password || !email) return res.status(400).json("All feilds required")
    if (!/(?=.*[a-z])/.test(password)) return res.status(400).json({ message: "Must have one small letter" })
    if (!/(?=.*[A-Z])/.test(password)) return res.status(400).json({ message: "Must have one capital letter" })
    if (!/(?=.*[@#$%&!*])/.test(password)) return res.status(400).json({ message: "Must have one special character" })
    if (!/(?=.*\d)/.test(password)) return res.status(400).json({ message: "Must have one number" })
    if (password.length < 8) return res.status(400).json({ message: "Must have 8 character" })
    const hashpassword = await bcrypt.hash(password, 10)

    resetPassword([hashpassword, email], (err, result) => {
        if (err) return res.status(500).json("db error :", err)
        return res.status(200).json({ message: "SuccessFully password changed" })
    })
}

const protectUserFun = async (req, res) => {
    const id = req.userId;
    return res.status(200).json({ message: "User Protected", id })
}


module.exports = { registerHandelFunction, loginHandelFunction, protectUserFun, forgotHandelFunction, resetPasswordFunction }