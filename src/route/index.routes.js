const { Router } = require('express');
const {autenticar, usuario, setPass, register, prueba} = require('../controllers/auth.controller');
const {cuenta, cuentas, nroCuenta, deposito, retiro, movimientos} = require('../controllers/cuenta.controller');
const verificarToken = require('../middleware/jwtMiddleware');
const router = Router();

router.post('/register/',register);
router.post('/login/', autenticar);
router.get('/usuario',verificarToken, usuario); //datos del usuario loggueado
router.get('/cuentas/', verificarToken, cuentas);//Todas las cuentas del cliente
router.get('/cuenta/:nroCuenta',verificarToken, cuenta);
router.get('/cuenta/:nroCuenta/saldo',verificarToken, nroCuenta);
router.post('/cuenta/:nroCuenta/deposito',verificarToken, deposito);
router.post('/cuenta/:nroCuenta/retiro',verificarToken, retiro);
router.get('/cuenta/:nroCuenta/movimientos', verificarToken, movimientos);

router.get('/inicial',prueba);
router.post('/setpass',verificarToken, setPass);
module.exports = router;