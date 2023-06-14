const db = require('../databaseConection/dbconection');


const createTableQuery = `
  CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    ci VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
const createClientesTable = () => {
    db.client.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error al crear la tabla:', err);
        } else {
            console.log('Tabla creada exitosamente');
        }
    });
}

const createTableTipoCuentaQuery = `
  CREATE TABLE tipocuentas (
    id SERIAL PRIMARY KEY,
    descripcion varchar(40),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
const createTipoCuentaTable = () => {
    db.client.query(createTableTipoCuentaQuery, (err, result) => {
        if (err) {
            console.error('Error al crear la tabla:', err);
        } else {
            console.log('Tabla tipo de cuenta creada exitosamente');
        }
    });
}

const createTableBancoQuery = `
  CREATE TABLE bancos (
    id SERIAL PRIMARY KEY,
   nombre varchar(40),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
const createBancoTable = () => {
    db.client.query(createTableBancoQuery, (err, result) => {
        if (err) {
            console.error('Error al crear la tabla:', err);
        } else {
            console.log('Tabla banco creada exitosamente');
        }
    });
}

const createTableTipoMonedaQuery = `
  CREATE TABLE tipomonedas (
    id SERIAL PRIMARY KEY,
   nombre varchar(40),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
const createTipoMonedaTable = () => {
    db.client.query(createTableTipoMonedaQuery, (err, result) => {
        if (err) {
            console.error('Error al crear la tabla:', err);
        } else {
            console.log('Tabla tipo moneda creada exitosamente');
        }
    });
}

const createTableCuentaQuery = `
  CREATE TABLE cuentas (
    id SERIAL PRIMARY KEY,
    nro INTEGER UNIQUE NOT NULL,
    saldo NUMERIC NOT NULL,
tipocuenta_id INTEGER NOT NULL,
cliente_id INTEGER NOT NULL,
banco_id INTEGER NOT NULL,
FOREIGN KEY (tipocuenta_id) REFERENCES tipocuentas(id)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (cliente_id) REFERENCES clientes(id)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (banco_id) REFERENCES bancos(id)
ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
const createCuentaTable = () => {
    db.client.query(createTableCuentaQuery, (err, result) => {
        if (err) {
            console.error('Error al crear la tabla:', err);
        } else {
            console.log('Tabla cuenta creada exitosamente');
        }
    });
}
const createTableMovimientoQuery = `
  CREATE TABLE movimientos (
    id SERIAL PRIMARY KEY,
   monto NUMERIC NOT NULL,
   tipomoneda_id INTEGER NOT NULL,
   cuenta_id  INTEGER NOT NULL,
   tipo varchar(100) NOT NULL,
   
FOREIGN KEY (tipomoneda_id) REFERENCES tipomonedas(id)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (cuenta_id) REFERENCES cuentas(id)
ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
const createMovimientoTable = () => {
    db.client.query(createTableMovimientoQuery, (err, result) => {
        if (err) {
            console.error('1 Error al crear la tabla:', err);
        } else {
            console.log('Tabla moi creada exitosamente');
        }
    });
}
module.exports = {
    createClientesTable,
    createTipoCuentaTable,
    createBancoTable,
    createTipoMonedaTable,
    createCuentaTable,
    createMovimientoTable
};