const { redirect }= require('../../managers/urls');

const redirectUrl = async (req, res) => {
    
    await redirect(req.params.shorturl).then((data) => {
        data? res.status(200).json(data):res.status(404).json('Not found')
    })
}

module.exports = redirectUrl;