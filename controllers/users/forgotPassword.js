
const { forgotPassword }= require('../../managers/users');
const nodemailer = require("nodemailer");

async function recoverPassword (req, res){

    const { email } = req.body;
    const result = await forgotPassword(email)
    if (result.message === 'Email not registered') {
        res.status(200).json('Email not registered')
    }
    else {
        const transporter = nodemailer.createTransport({
        service: process.env.MAILSERVICE, 
        auth: {
            user: process.env.MAILDIRECTION, 
            pass: process.env.MAILSECRET
      }});
      try {
        transporter.sendMail(result,(err, response) => {
        if (err) {
            res.status(404).json("Something wrong happened")
        }
        else {
            res.status(200).json(`Reset email sent to: ${response.accepted[0]}`);
        }
    })
      } catch (error) {
        res.status(404).json("Something wrong happened")
      }
    }


    
}

module.exports = recoverPassword; 



