const bcrypt = require('bcrypt');
const db = require('../databaseConection/dbconection');


class Cliente {
    constructor(name, ci, password) {
        this.name = name;
        this.ci = ci;
        this.password = password;
    }


    static validarDatos(name, ci, password) {
        if (!name || !ci || !password) {
            throw new Error('Todos los campos son obligatorios');
        }

        if (name.trim().length === 0) {
            throw new Error('El nombre no puede estar vacío');
        }

        if (ci.trim().length === 0) {
            throw new Error('La cédula de identidad no puede estar vacía');
        }

        if (password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
    }

    static async crearCliente(name, ci, password) {
        try {
            this.validarDatos(name, ci, password);

            const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña

            const query = 'INSERT INTO clientes (name, ci, password) VALUES ($1, $2, $3) RETURNING *';
            const values = [name, ci, hashedPassword];

            const result = await db.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear el cliente:', error);
            throw error;
        }
    }

    static async login(ci, password) {
        try {
            const query = 'SELECT * FROM clientes WHERE ci = $1';
            const values = [ci];

            const result = await db.client.query(query, values);
            if (result.rows.length === 0) {
                throw new Error('Credenciales inválidas. Inténtalo de nuevo.');
            }

            const cliente = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, cliente.password);
            if (!passwordMatch) {
                throw new Error('Credenciales inválidas. Inténtalo de nuevo.');
            }

            return cliente;
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            throw error;
        }
    }

    static async setPassword(cliente_id, password) {

        try {
            const hashedPassword = await bcrypt.hash(password, 15);
            console.log('hashedPassword: ', hashedPassword);
            const query = 'UPDATE clientes SET password = $1 WHERE id = $2';
            const values = [hashedPassword, cliente_id];

            await db.client.query(query, values);
        } catch (error) {
            console.error('Error al guardar el cliente:', error);
            throw error;
        }
    }
    static async getCliente(id) {
        try {
            const query = 'SELECT * FROM clientes WHERE id = $1';
            const result = await db.client.query(query, [id]);
            const cliente=result.rows[0];
          
            return cliente;
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
            throw error;
        }
    }

    static async getAllClientes() {
        try {
            const query = 'SELECT * FROM clientes';
            const result = await db.client.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
            throw error;
        }
    }
    
}

module.exports = Cliente;
