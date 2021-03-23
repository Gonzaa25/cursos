var express = require('express');
var router = express.Router();
const forgotpassController = require('../controllers/forgotpassword');

router.get('/',forgotpassController.forgotpassword_get);
router.post('/',forgotpassController.forgotpassword_post);

module.exports= router;