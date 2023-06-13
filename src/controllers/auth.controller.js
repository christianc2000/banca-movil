const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../databaseConection/dbconection');
const jwt_secret = process.env.JWT_SECRET;
const Cliente = require('../models/clientes');


const setPass = async (req, res) => {
    try {
        const { id } = req.usuario;

        console.log('id: ', id);

        const { password } = req.body; // Obtener cliente_id y password del cuerpo de la solicitud
        console.log('constraseña: ', password);
        await Cliente.setPassword(id, password); // Llamar al método estático setPassword

        res.json({ message: 'Contraseña guardada exitosamente' });
    } catch (error) {
        console.log('Error al guardar la contraseña:', error);
        res.status(500).json({ message: 'Ocurrió un error al guardar la contraseña' });
    }
}
const prueba= async (req, res) => {
    res.json({
        message: 'HOLAAA MUNDO'
    });
};
const autenticar = async (req, res) => {
    try {
        const { ci, password } = req.body;
console.log('ci: '+ ci+', password: '+password);
        const cliente = await Cliente.login(ci, password);

        const payload = {
            id: cliente.id,
            check: true
        };

        const token = jwt.sign(payload, jwt_secret, {
            expiresIn: '7d'
        });

        res.json({
            message: '¡Autenticación Exitosa!',
            token: token
        });
    } catch (err) {
        console.error('Error al iniciar sesión', err);
        res.status(500).json({ message: 'Ocurrió un error al iniciar sesión' });
    }
};

const usuario = async (req, res) => {
    try {
        const { id } = req.usuario;
        // Consultar el saldo de la cuenta en la base de datos
        //console.log(id);
        const cliente =await Cliente.getCliente(id);
      
        res.json({ cliente });
    } catch (err) {
        console.error('Error al obtener el saldo de la cuenta', err);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener el saldo de la cuenta' });
    }
}

const register = async (req, res) => {
    try {
        const { ci, name, password } = req.body;
        const cliente = await Cliente.crearCliente(name, ci, password);
        const payload = {
            id: cliente.id,
            check: true
        };

        const token = jwt.sign(payload, jwt_secret, {
            expiresIn: '7d'
        });

        res.json({ message: 'Se creó su cuenta exitosamente', usuario: cliente, token: token });
    } catch (error) {
        console.error('Error al registrar su cuenta');
        res.status(500).json({ mensaje: 'Ocurrió un error al crear su cuenta' });
    }
}
module.exports = { autenticar, usuario, setPass, register, prueba};
