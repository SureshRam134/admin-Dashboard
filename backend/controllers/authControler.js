const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { regDataInsert, getRegData } = require('../models/authQuery');

const registerHandelFunction = async (req, res) => {
    console.log(req.body);
    const { name, email, password, roleId } = req.body
    try {
        if (!name, !email, !password, !roleId) return res.status(400).json("All feilds required")
        if (!/^[a-zA-Z0-9.#+-]+@[a-zA-z.+-]+\.[a-zA-z]{2,}$/.test(email)) return res.status(400).json({ message: "Email not vaild formet" })
        if (!isNaN(email)) return res.status(400).json({ message: "Email only access" })
        if (!/(?=.*[a-z])/.test(password)) return res.status(400).json({ message: "Must have one small letter" })
        if (!/(?=.*[A-Z])/.test(password)) return res.status(400).json({ message: "Must have one capital letter" })
        if (!/(?=.*[@#$%&!*])/.test(password)) return res.status(400).json({ message: "Must have one special character" })
        if (!/(?=.*\d)/.test(password)) return res.status(400).json({ message: "Must have one number" })
        if (password.length < 8) return res.status(400).json({ message: "Must have 8 character" })
        const hashpassword = await bcrypt.hash(password, 10)

        regDataInsert([roleId, name, email, hashpassword], (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "Email already exists" })
                return res.status(500).json("DB error :", err)
            }
            return res.status(200).json({ message: "SuccessFull Registered" })
        })
    } catch (error) {
        return res.status(500).json("server error :", error)
    }
}



const loginHandelFunction = async (req, res) => {
    const {email, password, roleId} = req.body;
     getRegData([email], async(err, result) => {
         try {
            if(err) return res.status(500).json("DB error :", err)
            const data = result[0]
            if(!data) return res.status(400).json({message: "Email invaild"})
            if(data.roleId !== roleId) return res.status(400).json({message: "Check vaild domain"})
            const chechPassword =await bcrypt.compare(password, data.password )
            if(!chechPassword) return res.status(400).json({message: "Password invaild"})
            const token = jwt.sign({id:data.id}, process.env.JWT_SECRET ,{expiresIn:process.env.JWT_EXP})
            return res.status(200).json({message: "Successfully Login", token})
        
        } catch (error) {
            if(error) return res.status(500).json("server error :", error)
        }
     })
}

const forgetHandelFunction = async(req, res) => {

}

const protectUserFun = async (req, res) => {
    return res.status(200).json({message:"User Protected"})
}




module.exports = { registerHandelFunction, loginHandelFunction, protectUserFun, forgetHandelFunction}