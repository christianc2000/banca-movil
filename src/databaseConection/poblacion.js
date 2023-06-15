const db = require('../databaseConection/dbconection');
const bcrypt = require('bcrypt');

const insertRowCliente = `
INSERT INTO clientes (ci, name) VALUES
('18929922','Tania Apaza'),
('89291822','Carlos Perez'),
('78388727', 'Sara Calizaya');
`;

const insertRowTipoCuenta = `
INSERT INTO tipocuentas (descripcion) VALUES
('Cuenta de Ahorro'),
('Cuenta Corriente')
`;

const insertRowBanco = `
INSERT INTO bancos (nombre) VALUES
('BCP'),
('Banco Unión'),
('Banco Ganadero'),
('Banco Sol')
`;

const insertRowTipoMoneda = `
INSERT INTO tipomonedas (nombre) VALUES
('Bolivianos'),
('Dólares')
`;

const insertRowCuenta = `INSERT INTO cuentas (nro, saldo, tipocuenta_id, cliente_id, banco_id) VALUES
 (12345678,0,1,1,1),
 (11110001,0,1,1,2),
 (12345679,0,1,2,3),
 (11110002,0,2,2,4),
 (12345677,0,1,3,2),
 (11110003,0,2,3,3),
 (12345676,0,1,4,1),
 (11110004,0,2,4,2)
`;

const insertClientes = () => {
    db.client.query(insertRowCliente, (err, result) => {
        if (err) {
            console.error('Error al insertar en la tabla clientes:', err);
        } else {
            console.log('Se insertó los datos exitosamente');
            console.log(result.rows);
        }
    });
}
const insertTipoCuentas = () => {
    db.client.query(insertRowTipoCuenta, (err, result) => {
        if (err) {
            console.error('Error al insertar en la tabla tipo de cuentas:', err);
        } else {
            console.log('Se insertó los datos exitosamente');
        }
    });
}
const insertBancos = () => {
    db.client.query(insertRowBanco, (err, result) => {
        if (err) {
            console.error('Error al insertar en la tabla bancos:', err);
        } else {
            console.log('Se insertó los datos exitosamente');
        }
    });
}

const insertTipoMonedas = () => {
    db.client.query(insertRowTipoMoneda, (err, result) => {
        if (err) {
            console.error('Error al insertar en la tabla tipo monedas:', err);
        } else {
            console.log('Se insertó los datos exitosamente');

        }
    });
}

const insertCuentas = () => {
    db.client.query(insertRowCuenta, (err, result) => {
        if (err) {
            console.error('Error al insertar en la tabla cuenta:', err);
        } else {
            console.log('Se insertó los datos exitosamente');
            console.log(result);
        }
    });
}

const  addPassword = async(password, cliente_id) => {
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
const selectFrom = async() => {
    await db.client.query(`select * from clientes;`, (err, result) => {
        if (err) {
            console.error('Error al hacer select:', err);
        } else {
            console.log('Select realizado con éxito');
            console.log(result.rows);
        }
    });
}
module.exports = {
    insertClientes,
    insertTipoCuentas,
    insertBancos,
    insertTipoMonedas,
    insertCuentas,
    selectFrom,
    addPassword
}

