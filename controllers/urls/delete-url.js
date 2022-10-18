const { deleteUrl }= require('../../managers/urls');

async function deleteOneUrl (req, res){

    let result = await deleteUrl(req.body);
    if (result) {
        res.status(200).json(result);
    }
    else {
        res.status(404).json("not found")
    }
}

module.exports = deleteOneUrl; 