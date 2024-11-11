const express = require('express');
const router = express.Router();
const BibliotecaControlador = require('../cliente/controladores/Clientes');
const middlewares = require('../middlewares/auth');

//rutas util
router.post("/crear", middlewares.auth, BibliotecaControlador.crear);
router.get("/listar", middlewares.auth, BibliotecaControlador.listar )
router.get("/clientes/:id", middlewares.auth, BibliotecaControlador.uno);
router.put("/editar-clientes/:id", middlewares.auth, BibliotecaControlador.editar);
router.get('/pago', BibliotecaControlador.buscarPagoPorCuit);



module.exports = router;