var express = require('express');
var router = express.Router();
var bicisController = require('../controllers/bicicleta')

/* GET home page. */
router.get('/', bicisController.bicicletas_list);
router.get('/create', bicisController.bicicletas_create_get);
router.post('/create', bicisController.bicicletas_create_post);
router.post('/:id/delete', bicisController.bicicletas_delete_post);
router.get('/:id/update', bicisController.bicicletas_update_get);
router.post('/:id/update', bicisController.bicicletas_update_post);

module.exports = router;