const express = require('express');
const bodyParser = require('body-parser');
const db = require('./DB/dbconection');
const app = express();
const jwt = require('jsonwebtoken');
const verificarToken = require('./jwtMiddleware');

require('dotenv').config()//Variable de entorno
//const keys = require('./settings/keys');//keys
const puerto = process.env.PORT || 5000;//PUERTO DEL SERVER
const jwt_secret = process.env.JWT_SECRET;
console.log('jwt_secret: ', jwt_secret);
//console.log('key: '+keys.key);
//app.set('keys', keys.key);
//console.log('app key: '+app.get('keys'));
//app.use(express.urlencoded({extended:false}))
//app.use(express.json);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// base de datos

//********************************* */
app.post('/api/login/', async (req, res) => {
    try {
        const { ci, name } = req.body;

        // Obtener el usuario de la base de datos
        const query = 'SELECT * FROM clientes WHERE name = $1';
        const result = await db.client.query(query, [name]);


        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const cliente = result.rows[0];

        // Verificar la contraseña

        if (!ci == cliente.ci) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const payload = {
            id: cliente.id, // Asegúrate de que el ID esté presente en el objeto payload
            check: true
        };
        const token = jwt.sign(payload, jwt_secret, {
            expiresIn: '7d'
        });
        res.json({
            message: '¡Autenticación Exitosa!',
            token: token
        })


    } catch (err) {
        console.error('Error al iniciar sesión', err);
        res.status(500).json({ message: 'Ocurrió un error al iniciar sesión' });
    }
});
//const secret = process.env.SECRET
app.get('/api/cuentas', verificarToken, async (req, res) => {
    try {
        // Obtener el ID del cliente desde el token de autenticación
        console.log(req.usuario);
        const { id } = req.usuario;
        console.log('id: ', id);
        // Consultar todas las cuentas del cliente
        const query = 'SELECT * FROM cuentas WHERE cliente_id = $1';
        const result = await db.client.query(query, [id]);

        // Obtener los números de cuenta de los resultados
        const cuentas = result.rows;

        res.json({ cuentas });
    } catch (err) {
        console.error('Error al obtener las cuentas del cliente', err);
        res.status(500).json({ message: 'Ocurrió un error al obtener las cuentas del cliente' });
    }
});
app.get('/api/usuario', verificarToken, async (req, res) => {
    try {
        const { id } = req.usuario;
        // Consultar el saldo de la cuenta en la base de datos
        const query = 'SELECT * FROM clientes WHERE id = $1';
        const result = await db.client.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrada' });
        }

        const cliente = result.rows[0];

        res.json({ cliente });
    } catch (err) {
        console.error('Error al obtener el saldo de la cuenta', err);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener el saldo de la cuenta' });
    }
});
app.get('/api/cuentas/:nroCuenta/saldo', verificarToken, async (req, res) => {
    try {
        // Obtener el número de cuenta desde los parámetros de la ruta
        const { nroCuenta } = req.params;

        // Consultar el saldo de la cuenta en la base de datos
        const query = 'SELECT saldo FROM cuentas WHERE nro = $1';
        const result = await db.client.query(query, [nroCuenta]);

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
        }

        const saldo = result.rows[0].saldo;

        res.json({ saldo });
    } catch (err) {
        console.error('Error al obtener el saldo de la cuenta', err);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener el saldo de la cuenta' });
    }
});

app.post('/api/cuentas/:nroCuenta/deposito', verificarToken, async (req, res) => {
    try {
        const { nroCuenta } = req.params;
        const { monto, tipomoneda_id, cuenta_id } = req.body;

        // Verificar si la cuenta existe en la base de datos
        const query = 'SELECT * FROM cuentas WHERE nro = $1';
        const result = await db.client.query(query, [nroCuenta]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'La cuenta no existe' });
        }

        const cuenta = result.rows[0];
        const saldoActual = cuenta.saldo;

        // Realizar el depósito sumando el monto al saldo actual
        const nuevoSaldo = saldoActual + monto;

        // Actualizar el saldo en la base de datos
        const updateQuery = 'UPDATE cuentas SET saldo = $1 WHERE nro = $2';
        await db.client.query(updateQuery, [nuevoSaldo, nroCuenta]);
        const queryInsert = "insert into movimiento(tipo, tipomoneda_id, cuenta_id) values('Depósito',$1,$2)";
        await db.client.query(queryInsert, tipomoneda_id, cuenta_id);

        res.json({ message: 'Depósito realizado exitosamente' });
    } catch (err) {
        console.error('Error al realizar el depósito', err);
        res.status(500).json({ message: 'Ocurrió un error al realizar el depósito' });
    }

});
app.post('/api/cuentas/:nroCuenta/retiro', verificarToken, async (req, res) => {
    try {
        const { nroCuenta } = req.params;
        const { monto, tipomoneda_id, cuenta_id } = req.body;

        // Verificar si la cuenta existe en la base de datos
        const cuentaQuery = 'SELECT * FROM cuentas WHERE nro = $1';
        const cuentaResult = await db.client.query(cuentaQuery, [nroCuenta]);

        if (cuentaResult.rows.length === 0) {
            return res.status(404).json({ message: 'La cuenta no existe' });
        }

        const cuenta = cuentaResult.rows[0];
        const saldoActual = cuenta.saldo;

        // Verificar si el saldo es suficiente para el retiro
        if (saldoActual < monto) {
            return res.status(400).json({ message: 'Saldo insuficiente' });
        }

        // Realizar el retiro restando el monto al saldo actual
        const nuevoSaldo = saldoActual - monto;

        // Actualizar el saldo en la base de datos
        const updateQuery = 'UPDATE cuentas SET saldo = $1 WHERE nro = $2';
        await db.client.query(updateQuery, [nuevoSaldo, nroCuenta]);

        // Crear un nuevo movimiento en la tabla de transacciones
        const movimientoQuery = 'INSERT INTO transacciones (monto, tipo, tipomoneda_id, cuenta_id) VALUES ($1, $2, $3, $4)';
        await db.client.query(movimientoQuery, [monto, 'Retiro', tipomoneda_id, cuenta_id]);

        res.json({ message: 'Retiro realizado exitosamente' });
    } catch (err) {
        console.error('Error al realizar el retiro', err);
        res.status(500).json({ message: 'Ocurrió un error al realizar el retiro' });
    }
});

app.get('/api/cuentas/:nroCuenta/movimientos', verificarToken, async (req, res) => {
    try {
        const { nroCuenta } = req.params;

        // Verificar si la cuenta existe en la base de datos
        const query = 'SELECT * FROM cuentas WHERE nro = $1';
        const result = await db.client.query(query, [nroCuenta]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'La cuenta no existe' });
        }

        // Obtener las transacciones de la cuenta
        const movimientosQuery = 'SELECT * FROM movimientos WHERE nro = $1';
        const movimientosResult = await db.client.query(movimientosQuery, [nroCuenta]);

        const movimientos = movimientosResult.rows;

        res.json({ movimientos });
    } catch (err) {
        console.error('Error al obtener las movimientos', err);
        res.status(500).json({ message: 'Ocurrió un error al obtener las movimientos' });
    }
});


app.listen(puerto, async () => {
    try {
        await db.conexion();
        console.log('Conexión exitosa a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
        process.exit(1);
    }

    console.log(`Servidor escuchando en el puerto ${puerto}`);
});
