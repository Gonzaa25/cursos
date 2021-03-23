var express = require('express');
var router = express.Router();
var bicisController = require('../../controllers/api/bicicletaControllerAPI')

/* GET home page. */
router.get('/', bicisController.bicicletas_list);
// router.get('/create', bicisController.bicicletas_create_get);
router.post('/create', bicisController.bicicletas_create);
router.post('/delete', bicisController.bicicletas_delete);
//router.post('/update', bicisController.bicicletas_update);
// router.post('/:id/update', bicisController.bicicletas_update_post);

module.exports = router;