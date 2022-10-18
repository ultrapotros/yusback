const { newUrl }= require('../../managers/urls');

async function shortUrl (req, res){
    
    const {username, url } = req.body;
    const result = await newUrl(username,url)
    if (result) {
        res.status(200).json(result);
    }
    else {
        res.status(404).json("not found")
    }
    return result
    
}

module.exports = shortUrl; 