const db = require('../databaseConection/dbconection');

class Banco {
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


    static async insertBanco(nombre) {
        try {
            this.validarDatos(nombre);

            const query = 'INSERT INTO bancos (nombre) VALUES ($1) RETURNING *';
            const values = [nombre];

            const result = await db.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al insertar el banco:', error);
            throw error;
        }
    }

    static async getAllBancos() {
        try {
            const query = 'SELECT * FROM bancos';
            const result = await db.client.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener los banco:', error);
            throw error;
        }
    }

    static async getBanco(id) {
        try {
            const query = 'SELECT * FROM bancos WHERE nro = $1';
            const result = await db.client.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener el banco:', error);
            throw error;
        }
    }

    static async updateBanco(id, nombre) {
        try {
            this.validarDatos(nombre);

            const query = 'UPDATE bancos SET nombre = $1 WHERE id = $2 RETURNING *';
            const values = [nombre, id];

            const result = await db.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar el banco:', error);
            throw error;
        }
    }

    static async deleteBanco(id) {
        try {
            const query = 'DELETE FROM bancos WHERE id = $1';
            await db.client.query(query, [id]);
        } catch (error) {
            console.error('Error al eliminar el banco:', error);
            throw error;
        }
    }
}

module.exports =Banco
