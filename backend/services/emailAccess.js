const nodemailer = require("nodemailer");


const checkMail = (res) => {
    if (!/^[a-zA-Z0-9.#+-]+@[a-zA-z.+-]+\.[a-zA-z]{2,}$/.test(sender_email)) return res.status(400).json("Sender email not vaild formot ")
    // const email = sender_email.toLowerCase()
 
    return nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth: {
            user: process.env.SMTP_USER,
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