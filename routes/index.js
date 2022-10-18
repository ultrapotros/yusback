const router = require('express').Router();

router.use('/urls', require('./urls'));
router.use('/users', require('./users'));

module.exports = router;