const {getUserUrls}= require('../../managers/urls');

async function geturls (req, res){
    
    let result = await getUserUrls(req.params.username);
    res.status(200).json(result);
}

module.exports = geturls; 