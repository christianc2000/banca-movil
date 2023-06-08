const { Router } = require('express');
const {autenticar, usuario} = require('../controllers/auth.controller');
const {cuenta, nroCuenta, deposito, retiro, movimientos} = require('../controllers/cuenta.controller');
const verificarToken = require('../middleware/jwtMiddleware');
const router = Router();


router.post('/login/', autenticar);
router.get('/usuario',verificarToken, usuario);
router.get('/cuentas/', verificarToken, cuenta);
router.get('/cuentas/:nroCuenta/saldo',verificarToken, nroCuenta);
router.post('/cuentas/:nroCuenta/deposito',verificarToken, deposito);
router.post('/cuentas/:nroCuenta/retiro',verificarToken, retiro);
router.get('/cuentas/:nroCuenta/movimientos', verificarToken, movimientos);
module.exports = router;