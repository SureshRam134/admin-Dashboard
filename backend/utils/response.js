

const wrongResponse = (res,code,msg) => {
    return res.status(code).json({message:msg} )
}
const SuccessResponse = (res,code,msg,result = null) => {
    return res.status(code).json({message:msg ,result} )
}
const errorResponse = (res,code,msg, error = null) => {
    return res.status(code).json(msg ,error )
}


module.exports = {wrongResponse,SuccessResponse, errorResponse }