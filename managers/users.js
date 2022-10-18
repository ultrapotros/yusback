const User = require('../models/users');
const jwt = require('jsonwebtoken');

const newUser = async (username,premium,password,email) => {
  
    try {
      const response = await User.findOne({ username })
      if (response){
        return ({message: "User already exists"});
      }
      else {
        const newUser = new User({
          username, premium, password , email
      })
      try {
          const register = await newUser.save()
          return( register );
      }
      catch(err) { 
        return ({message:'Email already registered'})
      }
      }
    } catch (error) {
        console.log(error)
      
    }
}

const forgotPassword = async (email)=> {
    try {

        const user = await User.findOne({email} )
        if (!user) {
            return ({message:'Email not registered'})
        }
        else {

            const token = jwt.sign({user:user.username}, process.env.SECRET, {
              algorithm: 'HS256',
              expiresIn: '1h'
            })
            await user.update({tokenResetPassword:token})
            const emailPort = process.env.PORT || 3000;
            const mailOptions = {
                from: process.env.MAILDIRECTION,
                to:`${user.email}`,
                subject: 'Password reset email', 
                text: `http://localhost:${emailPort}/resetpassword/${token}`
            };
            return(mailOptions)
        }
      
    } catch (error) {
      return({ message: 'Something wrong happened'})
      
    }
}


/* ESta expresión es para validar el password
/* const regExPassword= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;
      if (!regExPassword.text(req.body.password)) {
        res.send({
          message:'The password must contains at least: between 8 and 16 characters, 1 number, 1 lowercase letter, 1 capital letter and 1 special character'
        });
        return;
      } */

const resetPassword = async  (email, password)=> {

      try {
          const res = await User.findOneAndUpdate(email, password, { returnOriginal: false })
        return (res,{ message:'Password updated successfully'})
        
      } catch (error) {
          return ({ message: error })
      }

    
}
  
module.exports = {
  newUser, 
  forgotPassword, 
  resetPassword
};