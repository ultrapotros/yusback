const { newUser }= require('../../managers/users');

async function postNewUser (req, res){

    const {username, premium, password, email } = req.body;
    const result = await newUser(username,premium,password,email)
    if (result) {
        res.status(200).json(result);
    }
    else {
        res.status(404).json("not found")
    }
    return result
    
}

module.exports = postNewUser; 