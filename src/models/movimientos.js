const db = require('../databaseConection/dbconection');

class Movimiento {
    constructor(monto, tipo, tipomoneda_id, cuenta_id) {
        this.monto = monto;
        this.tipo = tipo;
        this.tipomoneda_id = tipomoneda_id;
        this.cuenta_id = cuenta_id;
    }

    static validarDatos(monto, tipo, tipomoneda_id, cuenta_id) {
        if (typeof monto !== 'number' || isNaN(monto) || monto <= 0) {
            throw new Error('El monto debe ser un número válido mayor que cero.');
        }

        if (tipo.trim().length === 0) {
            throw new Error('El tipo no puede estar vacío');
        }

        if (typeof tipomoneda_id !== 'number' || !Number.isInteger(tipomoneda_id) || tipomoneda_id <= 0) {
            throw new Error('El tipomoneda_id debe ser un número entero válido mayor que cero.');
        }

        if (typeof cuenta_id !== 'number' || !Number.isInteger(cuenta_id) || cuenta_id <= 0) {
            throw new Error('El cuenta_id debe ser un número entero válido mayor que cero.');
        }
    }

    static async insertMovimiento(monto, tipo, tipomoneda_id, cuenta_id) {
        try {
            this.validarDatos(monto, tipo, tipomoneda_id, cuenta_id);

            const query = 'INSERT INTO movimientos (monto, tipo, tipomoneda_id, cuenta_id) VALUES ($1, $2, $3, $4) RETURNING *';
            const values = [monto, tipo, tipomoneda_id, cuenta_id];

            const result = await db.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear el movimiento:', error);
            throw error;
        }
    }

    static async getMovimiento(id) {
        const query = 'SELECT * FROM movimientos WHERE id = $1';
        const values = [id];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener el movimiento:', error);
            throw error;
        }
    }
    static async getCuentaMovimiento(nroCuenta) {
        // Verificar si la cuenta existe en la base de datos
        const query = 'SELECT * FROM cuentas WHERE nro = $1';
        const result = await db.client.query(query, [nroCuenta]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'La cuenta no existe' });
        }

        // Obtener las transacciones de la cuenta
        const movimientosQuery = 'SELECT * FROM movimientos WHERE cuenta_id = $1';
        const movimientosResult = await db.client.query(movimientosQuery, [result.rows[0].id]);

        return movimientosResult.rows;
    }

    static async updateMovimiento(id, monto, tipo, tipomoneda_id, cuenta_id) {

        try {
            this.validarDatos(monto, tipo, tipomoneda_id, cuenta_id);
            const query = 'UPDATE movimientos SET monto = $1, tipo = $2, tipomoneda_id = $3, cuenta_id = $4 WHERE id = $5 RETURNING *';
            const values = [monto, tipo, tipomoneda_id, cuenta_id, id];

            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar el Movimiento:', error);
            throw error;
        }
    }

    static async deleteMovimiento(id) {
        const query = 'DELETE FROM movimientos WHERE id = $1';

        try {
            await db.query(query, [id]);
        } catch (error) {
            console.error('Error al eliminar el movimiento:', error);
            throw error;
        }
    }
}

module.exports = Movimiento;
