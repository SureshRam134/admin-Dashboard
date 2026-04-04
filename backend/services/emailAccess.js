const nodemailer = require("nodemailer");
const { response } = require("../utils/response");


const checkMail = (res) => {
    const isEmail = process.env.SMTP_USER
    const email = isEmail.trim().toLowerCase()
    if (!/^[a-zA-Z0-9.#+-]+@[a-zA-z.+-]+\.[a-zA-z]{2,}$/.test(email)) return response(res, 400 ,false, "Sender email not vaild formot ")
    return nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        secure : false,
        auth: {
            user: email,
            pass: process.env.SMTP_PASS
        },
    });


}


module.exports = checkMail


// return nodemailer.createTransport({
//         host:process.env.SMTP_HOST || "smtp.gmail.com",
//         port:process.env.SMTP_PORT || 587,
//         secure:false,
//         auth: {
//             user: isEmail,
//             pass: process.env.SMTP_PASS
//         },
        
//     });