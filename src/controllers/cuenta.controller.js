const Movimiento = require('../models/movimientos');
const Cuenta = require('../models/cuentas');

const cuentas = async (req, res) => {
    try {
        // Obtener el ID del cliente desde el token de autenticación
        const { id } = req.usuario;
        // Consultar todas las cuentas del cliente
        const cuentas = await Cuenta.getClientCuenta(id);
        res.json({ cuentas });
    } catch (err) {
        console.error('Error al obtener las cuentas del cliente', err);
        res.status(500).json({ message: 'Ocurrió un error al obtener las cuentas del cliente' });
    }
};

const cuenta = async (req, res) => {
    try {
        const { nroCuenta } = req.params;
        const cuenta = await Cuenta.getCuenta(nroCuenta);

        res.json({ cuenta });
    } catch (err) {
        console.error('Error al obtener las cuentas del cliente', err);
        res.status(500).json({ message: 'Ocurrió un error al obtener las cuentas del cliente' });
    }
};

const nroCuenta = async (req, res) => {
    try {
        // Obtener el número de cuenta desde los parámetros de la ruta
        const { nroCuenta } = req.params;
        const saldo = await Cuenta.getSaldoCuenta(nroCuenta);
        res.json({ saldo });
    } catch (err) {
        console.error('Error al obtener el saldo de la cuenta', err);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener el saldo de la cuenta' });
    }
}

const deposito = async (req, res) => {
    try {
        const { nroCuenta } = req.params;
        const { monto, tipomoneda_id } = req.body;

        console.log('nroCuenta: '+parseInt(nroCuenta));
        const result = await Cuenta.getCuenta(nroCuenta);
       
        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
        }
        // Realizar el depósito sumando el monto al saldo actual
        nuevoSaldo = parseFloat(result.saldo) + parseFloat(monto);
        console.log('nuevoSaldo: '+nuevoSaldo);
        const nroCuentaEntero = parseInt(nroCuenta, 10); // Utilizando parseInt()
// O
        // Actualizar el saldo en la base de datos
        const cuenta_id = await Cuenta.updateSaldoCuenta(nuevoSaldo, nroCuenta);
        const movimiento = await Movimiento.insertMovimiento(parseFloat(monto), "depósito", parseInt(tipomoneda_id), cuenta_id, nroCuentaEntero);//1 es el depósito
        res.json({ message: 'Depósito realizado exitosamente', depositó: monto, Saldo: nuevoSaldo, Movimiento: movimiento });
    } catch (err) {
        console.error('Error al realizar el depósito', err);
        res.status(500).json({ message: 'Ocurrió un error al realizar el depósito' });
    }
}

const retiro = async (req, res) => {
    try {
        const { nroCuenta } = req.params;
        const { monto, tipomoneda_id } = req.body;

        const result = await Cuenta.getCuenta(nroCuenta);
        console.log(result);
        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
        }
        // Realizar el depósito sumando el monto al saldo actual
        if (monto <= result.saldo) {
            const nroCuentaEntero = parseInt(nroCuenta, 10); // Utilizando parseInt()
            // O
            nuevoSaldo = parseFloat(result.saldo) - parseFloat(monto);
            // Actualizar el saldo en la base de datos
            const movimiento = await Movimiento.insertMovimiento(parseFloat(monto), "retiro", parseInt(tipomoneda_id), result.id, nroCuentaEntero);//1 es el depósito
            await Cuenta.updateSaldoCuenta(nuevoSaldo, nroCuenta);

            res.json({ message: 'Retiro realizado exitosamente', retiró: monto, Saldo: nuevoSaldo, Movimiento: movimiento });
        } else {
            res.json({ message: "Saldo insuficiente para retirar", saldo:result.saldo });
        }

    } catch (err) {
        console.error('Error al realizar el depósito', err);
        res.status(500).json({ message: 'Ocurrió un error al realizar el depósito' });
    }
}

const pagar = async (req, res) => {
    try {
        const { nroCuenta } = req.params;
        const { monto, tipomoneda_id, nroCuentaDestino } = req.body;

        const result = await Cuenta.getCuenta(nroCuenta);
        console.log(result);
        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
        }
        // Realizar el depósito sumando el monto al saldo actual
        if (monto <= result.saldo) {
            nuevoSaldo = parseFloat(result.saldo) - parseFloat(monto);
            const nroCuentaDestinoEntero = parseInt(nroCuentaDestino, 10); // Utilizando parseInt()
            // Actualizar el saldo en la base de datos
            const movimiento = await Movimiento.insertMovimiento(parseFloat(monto), "pago", parseInt(tipomoneda_id), result.id, nroCuentaDestinoEntero);//1 es el depósito
            await Cuenta.updateSaldoCuenta(nuevoSaldo, nroCuenta);
          
            //PARA LA CUENTA DESTINO
            const result2 = await Cuenta.getCuenta(nroCuentaDestino);
           // console.log(result2);
            if (result2.length === 0) {
                return res.status(404).json({ mensaje: 'Cuenta Destino no encontrada' });
            } 
            nuevoSaldo2 = parseFloat(result2.saldo) + parseFloat(monto);
            await Movimiento.insertMovimiento(parseFloat(monto), "depósito", parseInt(tipomoneda_id), result2.id, nroCuentaDestinoEntero);//1 es el depósito
            await Cuenta.updateSaldoCuenta(nuevoSaldo2, nroCuentaDestino);

            res.json({ message: 'Retiro realizado exitosamente', pagó: monto, nroCuentaDestino:nroCuentaDestinoEntero,Saldo: nuevoSaldo, Movimiento: movimiento });
        } else {
            res.json({ message: "Saldo insuficiente para retirar", saldo:result.saldo });
        }

    } catch (err) {
        console.error('Error al realizar el depósito', err);
        res.status(500).json({ message: 'Ocurrió un error al realizar el depósito' });
    }
}

const movimientos = async (req, res) => {
    try {
        const { nroCuenta } = req.params;
        const movimientos = await Movimiento.getCuentaMovimiento(nroCuenta);
        const cuenta = await Cuenta.getCuenta(nroCuenta);
        res.json({ movimientos, cuenta });
    } catch (err) {
        console.error('Error al obtener las movimientos', err);
        res.status(500).json({ message: 'Ocurrió un error al obtener las movimientos' });
    }
}
module.exports = { cuenta, cuentas, nroCuenta, deposito, retiro, movimientos, pagar }