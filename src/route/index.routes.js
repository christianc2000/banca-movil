const { Router } = require('express');
const {autenticar, usuario, setPass, register, prueba} = require('../controllers/auth.controller');
const {cuenta, cuentas, nroCuenta, deposito, retiro, movimientos, pagar} = require('../controllers/cuenta.controller');
const {getBancos, getClientes, getTipoMonedas, getTipoCuentas, getCuentas} = require('../controllers/api.controller');
const verificarToken = require('../middleware/jwtMiddleware');
const router = Router();

router.get('/',prueba);
router.post('/register/',register);
router.post('/login/', autenticar);
router.get('/usuario',verificarToken, usuario); //datos del usuario loggueado
router.get('/cuentas/', verificarToken, cuentas);//Todas las cuentas del cliente
router.get('/cuenta/:nroCuenta',verificarToken, cuenta);
router.get('/cuenta/:nroCuenta/saldo',verificarToken, nroCuenta);
router.post('/cuenta/:nroCuenta/deposito',verificarToken, deposito);
router.post('/cuenta/:nroCuenta/retiro',verificarToken, retiro);
router.post('/cuenta/:nroCuenta/pago', verificarToken, pagar);
router.get('/cuenta/:nroCuenta/movimientos', verificarToken, movimientos);

router.get('/clientes-total', verificarToken, getClientes);
router.get('/cuentas-total', verificarToken, getCuentas);
router.get('/bancos-total', verificarToken,getBancos);
router.get('/tipocuentas-total', verificarToken,getTipoCuentas);
router.get('/tipomonedas-total', verificarToken, getTipoMonedas);


//router.get('/inicial',prueba);
router.post('/setpass',verificarToken, setPass);
module.exports = router;