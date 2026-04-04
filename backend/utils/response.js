

const response =(res, code, boolian = false ,msg, result = null) => {
    return res.status(code).json({status:boolian ,message:msg , result} )
}

module.exports = {response}