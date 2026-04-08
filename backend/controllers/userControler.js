const { Op, where } = require("sequelize");
const User = require("../models/user")
const { response } = require("../utils/response");



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
        if (!getUser) return response(res, 404, false, "User Not Found")
        const totalPage = Math.ceil(getUser.count / limit)
        return response(res, 200, true, "SuccessFully Get", {
            totalUser: getUser.count,
            totalPage,
            currentPage: page,
            nextPage: page < totalPage ? page + 1 : 0,
            prePage: page > 1 ? page - 1 : 0,
            users: getUser.rows
        })

    } catch (error) {
        return response(res, 500, false, "Server Error : ", error.message)
    }
}

const updateUserFunction = async (req, res) => {
    const { name, email } = req.body
    const {id} = req.params;
    console.log(id, 8798);
    
    if (!id) return response(res, 400, false, "Something wrong")
    try {
        const user = await User.update({ name: name, email: email }, { where: { id } })
        console.log(user);
        return response(res, 200, true, "Successfully Update")
    } catch (error) {
        return response(res, 500, false, "Server Error: ", error)
    }

}
const deleteUserFunction = async (req, res) => {
    
    const {isActive} =req.body;
    const {id} =req.params;
    if(!id) return response(res, 400, false, "Something wrong")
    const active = isActive ? 1 : 0 
    try {
        await User.update({active:active}, {where:{id}})
        return response(res, 200, true, "User access denied", active)
    } catch (error) {
        return response(res, 500, false, "Server Error: ", error)
    }
}




module.exports = { getUserFunction, updateUserFunction, deleteUserFunction }