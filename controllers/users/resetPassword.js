const { resetPassword }= require('../../managers/users');

async function newPassword (req, res){

    const { password, email } = req.body;
    const result = await resetPassword(email, password)
    if (result) {
        res.status(200).json(result);
    }
    else {
        res.status(404).json("not found")
    }
    return result
    
}

module.exports = newPassword; 