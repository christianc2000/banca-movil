const db = require('../databaseConection/dbconection');
class TipoCuenta {
    constructor(descripcion) {
        this.descripcion = descripcion;
    }


    static validarDatos(descripcion) {
        if (!descripcion) {
            throw new Error('Todos los campos son obligatorios');
        }

        if (descripcion.trim().length === 0) {
            throw new Error('El descripcion no puede estar vacío');
        }
    }


    static async insertTipoCuenta(descripcion) {
        try {
            this.validarDatos(descripcion);

            const query = 'INSERT INTO tipocuentas (descripcion) VALUES ($1) RETURNING *';
            const values = [descripcion];

            const result = await db.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al insertar el tipo de cuenta:', error);
            throw error;
        }
    }

    static async getTipoCuenta(id) {
        try {
            const query = 'SELECT * FROM tipocuentas WHERE nro = $1';
            const result = await db.client.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener el tipo de cuenta:', error);
            throw error;
        }
    }

    static async getAllTipoCuentas() {
        try {
            const query = 'SELECT * FROM tipocuentas';
            const result = await db.client.query(query);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener los tipo de cuentas:', error);
            throw error;
        }
    }

    static async updateTipoCuenta(id, descripcion) {
        try {
            this.validarDatos(descripcion);

            const query = 'UPDATE tipocuentas SET descripcion = $1 WHERE id = $2 RETURNING *';
            const values = [descripcion, id];

            const result = await db.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar el tipo de cuenta:', error);
            throw error;
        }
    }

    static async deleteTipoCuenta(id) {
        try {
            const query = 'DELETE FROM tipocuentas WHERE id = $1';
            await db.client.query(query, [id]);
        } catch (error) {
            console.error('Error al eliminar el tipo de cuenta:', error);
            throw error;
        }
    }
}

module.exports = TipoCuenta
