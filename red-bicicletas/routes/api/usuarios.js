var express = require('express');
var router = express.Router();
var usuariosController = require('../../controllers/api/usuarioControllerAPI')

/* GET usuarios */
router.get('/', usuariosController.usuario_list);
router.post('/create', usuariosController.usuario_create);
router.post('/delete', usuariosController.usuario_delete);
router.post('/reservar', usuariosController.usuario_reservar);

module.exports = router;