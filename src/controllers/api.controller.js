const TipoMoneda = require('../models/tipomonedas');
const TipoCuenta = require('../models/tipocuentas');
const Banco = require('../models/bancos');
const Cliente = require('../models/clientes');
const Cuenta = require('../models/cuentas');

const getBancos = async (req, res) => {
    try {
        const bancos = await Banco.getAllBancos();
        res.json({ bancos });
    } catch (err) {
        console.error('Error al obtener los bancos', err);
        res.status(500).json({ message: 'Ocurrió un error al obtener las bancos' });
    }
};
const getTipoCuentas = async (req, res) => {
    try {
        const tipocuentas = await TipoCuenta.getAllTipoCuentas();
        res.json({ tipocuentas });
    } catch (err) {
        console.error('Error al obtener los tipo de cuentas', err);
        res.status(500).json({ message: 'Ocurrió un error al obtener los tipo de cuentas' });
    }
};
const getTipoMonedas = async (req, res) => {
    try {
        const tipomonedas = await TipoMoneda.getAllTipoMonedas();
        res.json({ tipomonedas });
    } catch (err) {
        console.error('Error al obtener los tipo de monedas', err);
        res.status(500).json({ message: 'Ocurrió un error al obtener los tipo de monedas' });
    }
};
const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.getAllClientes();
        res.json({ clientes });
    } catch (err) {
        console.error('Error al obtener los clientes', err);
        res.status(500).json({ message: 'Ocurrió un error al obtener las clientes' });
    }
};

const getCuentas = async (req, res) => {
    try {
        const cuentas = await Cuenta.getAllCuentas();
        res.json({ cuentas });
    } catch (err) {
        console.error('Error al obtener las cuentas', err);
        res.status(500).json({ message: 'Ocurrió un error al obtener las cuentas' });
    }
};

module.exports = {
    getBancos,
    getClientes,
    getTipoCuentas,
    getTipoMonedas,
    getCuentas
}
