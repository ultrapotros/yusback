var router = require('express').Router();

router.delete('/delete', require('../controllers/urls/delete-url')); 
router.get('/:username/all', require('../controllers/urls/get-user-urls')); 
router.put('/modify/:id/:newshorturl', require('../controllers/urls/modifyurl')); 
router.post('/newregister', require('../controllers/urls/postUrls')); 
router.get('/yus/:shorturl', require('../controllers/urls/redirect')); 

module.exports = router;