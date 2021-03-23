var express = require('express');
var router = express.Router();
const resetpassController = require('../controllers/resetpassword');

router.get('/',resetpassController.resetpassword_get);
router.post('/',resetpassController.resetpassword_post);

module.exports= router;