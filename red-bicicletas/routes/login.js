var express = require('express');
var router = express.Router();
const loginController = require('../controllers/login');

router.get('/',loginController.login_get);
router.post('/',loginController.login_post);

module.exports= router;