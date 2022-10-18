const {model , Schema}   = require("mongoose");

const User= new Schema({
    username: {type: String, unique: true, required:true},
    premium:  {type:Boolean},
    email: {type: String, unique: true, required:true},
    password: {type: String}
})

module.exports = model("Userdata", User);