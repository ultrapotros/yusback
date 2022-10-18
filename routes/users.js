var router = require('express').Router();

router.post('/newuser', require('../controllers/users/newUser')); 
router.post('/forgotpassword', require('../controllers/users/forgotPassword')); 
router.post('/resetpassword', require('../controllers/users/resetPassword')); 

module.exports = router;