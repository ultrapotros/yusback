const jwt = require('jsonwebtoken')
const User = require('../models/users');

const loginController = async (req, res) => {

    const { username, password } = req.body
    const token2 = await User.findOne( {username} ).then((user) => {
        if(!user){ 
            return res.status(206).json({nouser:true})
        }
        else if (password !== user.password){
            return res.json({password:"wrong"})
        }
        else {
            const token = jwt.sign({ username }, process.env.SECRET, {
            algorithm: 'HS256',
            expiresIn: '7 days'
            })
            return ([token,user])
        }
    })
    .catch(err => console.log(err));
       
    if (token2) {
        res.json({...token2})
    }
    else {
        res.status(206).end();
    }
}
module.exports = loginController;
