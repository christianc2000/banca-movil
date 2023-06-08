const jwt = require('jsonwebtoken');
const db = require('../databaseConection/dbconection');
const jwt_secret = process.env.JWT_SECRET;

const autenticar = async (req, res) => {
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
        if (ci !== cliente.ci) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

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

const usuario = async(req, res) =>{
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
}

module.exports = {autenticar, usuario};
