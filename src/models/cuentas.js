const db = require('../databaseConection/dbconection');

class Cuenta {
    constructor(nro, saldo, tipocuenta_id, cliente_id, banco_id) {
        this.nro = nro;
        this.saldo = saldo;
        this.tipocuenta_id = tipocuenta_id;
        this.cliente_id = cliente_id;
        this.banco_id = banco_id;
    }


    static validarDatos(nro, saldo, tipocuenta_id, cliente_id, banco_id) {
        if (typeof nro !== 'number' || !Number.isInteger(nro) || nro <= 0) {
            throw new Error('El número de cuenta debe ser un entero válido mayor que cero.');
        }

        if (typeof saldo !== 'number' || isNaN(saldo) || saldo < 0) {
            throw new Error('El saldo debe ser un número válido mayor o igual a cero.');
        }

        if (typeof tipocuenta_id !== 'number' || !Number.isInteger(tipocuenta_id) || tipocuenta_id <= 0) {
            throw new Error('El ID del tipo de cuenta debe ser un entero válido mayor que cero.');
        }

        if (typeof cliente_id !== 'number' || !Number.isInteger(cliente_id) || cliente_id <= 0) {
            throw new Error('El ID del cliente debe ser un entero válido mayor que cero.');
        }

        if (typeof banco_id !== 'number' || !Number.isInteger(banco_id) || banco_id <= 0) {
            throw new Error('El ID del banco debe ser un entero válido mayor que cero.');
        }
    }

    static async insertCuenta(nro, saldo, tipocuenta_id, cliente_id, banco_id) {
        try {
            this.validarDatos(nro, saldo, tipocuenta_id, cliente_id, banco_id);

            const query = 'INSERT INTO cuentas (nro, saldo, tipocuenta_id, cliente_id, banco_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [nro, saldo, tipocuenta_id, cliente_id, banco_id];

            const result = await db.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al insertar la cuenta:', error);
            throw error;
        }
    }

    static async getCuenta(nroCuenta) {
        try {
            const query = 'SELECT * FROM cuentas WHERE nro = $1';
            const result = await db.client.query(query, [nroCuenta]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener la cuenta:', error);
            throw error;
        }
    }
    static async getClientCuenta(cliente_id) {
        try {
            const query = 'SELECT * FROM cuentas WHERE cliente_id = $1';
            const Cliente_id = [cliente_id];
            console.log(Cliente_id);
            const result = await db.client.query(query, Cliente_id);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener las cuentas del cliente:', error);
            throw error;
        }
    }
    static async getSaldoCuenta(nroCuenta) {
        try {
            const query = 'SELECT saldo FROM cuentas WHERE nro = $1';
            const result = await db.client.query(query, [nroCuenta]);

            if (result.rows.length === 0) {
                return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
            }
            const saldo = result.rows[0].saldo;
            return saldo;
        } catch (error) {
            console.error('Error al obtener las el saldo de la cuenta:', error);
            throw error;
        }

    }

    static async updateCuenta(id, nro, saldo, tipocuenta_id, cliente_id, banco_id) {
        try {
            this.validarDatos(nro, saldo, tipocuenta_id, cliente_id, banco_id);

            const query = 'UPDATE cuentas SET nro = $1, saldo = $2, tipocuenta_id = $3, cliente_id = $4, banco_id = $5 WHERE id = $6 RETURNING *';
            const values = [nro, saldo, tipocuenta_id, cliente_id, banco_id, id];

            const result = await db.client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar la cuenta:', error);
            throw error;
        }
    }

    static async updateSaldoCuenta(nuevoSaldo, nroCuenta) {
        try {
            const updateQuery = 'UPDATE cuentas SET saldo = $1 WHERE nro = $2 RETURNING *';
            const result = await db.client.query(updateQuery, [nuevoSaldo, nroCuenta]);
            if (result.rows.length === 0) {
                throw new Error('No se encontró ninguna cuenta con el número especificado.');
            }
            return result.rows[0].id;
        } catch (error) {
            console.error('Error al actualizar la cuenta:', error);
            throw error;
        }
    }

    static async deleteCuenta(id) {
        try {
            const query = 'DELETE FROM cuentas WHERE id = $1';
            await db.client.query(query, [id]);
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
            throw error;
        }
    }
}

module.exports = Cuenta;
