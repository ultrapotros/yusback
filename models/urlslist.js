const {model , Schema}   = require("mongoose");

const Urlsdata = new Schema({
    username: {type: String}, 
    clicksCounter: {type:Number},
    url: {type: String},
    shorturl: {type: String,  unique: true, required:true },
    createdAt: {type: Date, default: Date.now},
})

module.exports = model("Urlsdata", Urlsdata);