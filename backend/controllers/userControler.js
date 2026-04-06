const User = require("../models/user")
const { response } = require("../utils/response")



const getUserFunction = async (req, res) => {

    const page = parseInt(req.query.page || 1) 
    const limit = parseInt(req.query.limit || 10) 
    const offset = (page - 1) * limit

    try {
        const roleId = 3
        const getUser = await User.findAndCountAll({ where: { roleId }, limit, offset })
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




module.exports = { getUserFunction }