const db = require('../databaseConection/dbconection');
class TipoMoneda {
    constructor(nombre) {
        this.nombre = nombre;
    }


    static validarDatos(nombre) {
        if (!nombre) {
            throw new Error('Todos los campos son obligatorios');
        }

        if (nombre.trim().length === 0) {
            throw new Error('El nombre no puede estar vacío');
        }
    }


    static async insertTipoMoneda(nombre) {
        try {
            this.validarDatos(nombre);

            const query = 'INSERT INTO tipomonedas (nombre) VALUES ($1) RETURNING *';
            const values = [nombre];

            const result = await db.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al insertar el tipo de moneda:', error);
            throw error;
        }
    }

    static async getTipoMoneda(id) {
        try {
            const query = 'SELECT * FROM tipomonedas WHERE nro = $1';
            const result = await db.client.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener el tipo de moneda:', error);
            throw error;
        }
    }

    static async getAllTipoMonedas() {
        try {
            const query = 'SELECT * FROM tipomonedas';
            const result = await db.client.query(query);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener los tipo de moneda:', error);
            throw error;
        }
    }

    static async updateTipoMoneda(id, nombre) {
        try {
            this.validarDatos(nombre);

            const query = 'UPDATE tipomonedas SET nombre = $1 WHERE id = $2 RETURNING *';
            const values = [nombre, id];

            const result = await db.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar el tipo de moneda:', error);
            throw error;
        }
    }

    static async deleteTipoMoneda(id) {
        try {
            const query = 'DELETE FROM tipomonedas WHERE id = $1';
            await db.client.query(query, [id]);
        } catch (error) {
            console.error('Error al eliminar el tipo de moneda:', error);
            throw error;
        }
    }
}

module.exports = TipoMoneda