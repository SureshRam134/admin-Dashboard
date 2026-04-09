const { Op, where } = require("sequelize");
const User = require("../models/user")
const { response } = require("../utils/response");
const bcrypt = require('bcrypt');


const getUserFunction = async (req, res) => {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 10)
    const search = req.query.search || ''
    const offset = (page - 1) * limit
    const roleId = 3
    const whereCondition = { roleId }
    if (search) {
        whereCondition[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
        ]
    }
    try {
        const getUser = await User.findAndCountAll({ where: whereCondition, limit, offset })
        if (!getUser) return response(res, 404, "User Not Found")
        const totalPage = Math.ceil(getUser.count / limit)
        return response(res, 200, "SuccessFully Get", {
            totalUser: getUser.count,
            totalPage,
            currentPage: page,
            nextPage: page < totalPage ? page + 1 : 0,
            prePage: page > 1 ? page - 1 : 0,
            users: getUser.rows
        })

    } catch (error) {
        return response(res, 500, "Server Error : ", error.message)
    }
}


const addUserFunction = async (req, res) => {
    const { name, email, password, roleId } = req.body;
    try {
        if (!name || !email || !password) return response(res, 400, "All feilds required")
        if (!/^[a-zA-Z0-9.#+-]+@[a-zA-z.+-]+\.[a-zA-z]{2,}$/.test(email)) return response(res, 400, "Email not vaild formet")
        if (!isNaN(email)) return response(res, 400, "Email only access")
        if (!/(?=.*[a-z])/.test(password)) return response(res, 400, "Must have one small letter")
        if (!/(?=.*[A-Z])/.test(password)) return response(res, 400, "Must have one capital letter")
        if (!/(?=.*[@#$%&!*])/.test(password)) return response(res, 400, "Must have one special character")
        if (!/(?=.*\d)/.test(password)) return response(res, 400, "Must have one number")
        if (password.length < 8) return response(res, 400, "Must have 8 character")
        const exist = await User.findOne({ where: { email } });
        if (exist) return response(res, 400, "User already exists")
        const hashpassword = await bcrypt.hash(password, 10)
        const isEmail = email.trim().toLowerCase();
        const newUser = await User.create({
            roleId,
            name,
            email: isEmail,
            password: hashpassword,
        });

        return response(res, 200, "SuccessFull Registered", {
     
            name: newUser.name,
            email: newUser.email,
            roleId: newUser.roleId,
            active: newUser.active,
        })
    } catch (error) {
        return response(res, 500, "server error :", error.message)
    }
}

const updateUserFunction = async (req, res) => {
    const { name, email } = req.body
    const { id } = req.params;
    if (!id) return response(res, 400, "Invaild id")
    try {
        const user = await User.findByPk(id)
        if (!user) return response(res, 404, "User not found")
        await user.update({ name: name, email: email })
        return response(res, 200, "Successfully Update", user)
    } catch (error) {
        return response(res, 500, "Server Error: ", error.message)
    }

}
const deleteUserFunction = async (req, res) => {

    const { isActive } = req.body;
    const { id } = req.params;
    if (!id) return response(res, 400, "Invaild id")
    try {
        const user = await User.findByPk(id)
        if (!user) return response(res, 404, "User not found")
        const newStatus = isActive ? 1 : 0
        await user.update({ active: newStatus })
        return response(res, 200, newStatus ? "User Deactivated" : "User Activated", newStatus)
    } catch (error) {
        return response(res, 500, "Server Error: ", error.message)
    }
}




module.exports = { getUserFunction, updateUserFunction, deleteUserFunction, addUserFunction }