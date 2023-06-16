const db = require('../databaseConection/dbconection');

const dropTableMovimientosQuery = `DROP TABLE IF EXISTS movimientos`;
const dropTableCuentasQuery = `DROP TABLE IF EXISTS cuentas`;
const dropTableTipoCuentasQuery = `DROP TABLE IF EXISTS tipocuentas`;
const dropTableTipoMonedasQuery = `DROP TABLE IF EXISTS tipomonedas`;
const dropTableBancosQuery = `DROP TABLE IF EXISTS bancos`;
const dropTableClientesQuery = `DROP TABLE IF EXISTS clientes`;

const dropAllTables = () => {
  db.client.query(dropTableMovimientosQuery, (err, result) => {
    if (err) {
      console.error('Error al eliminar la tabla movimientos:', err);
    } else {
      console.log('Tabla movimientos eliminada exitosamente');
    }
  });

  db.client.query(dropTableCuentasQuery, (err, result) => {
    if (err) {
      console.error('Error al eliminar la tabla cuentas:', err);
    } else {
      console.log('Tabla cuentas eliminada exitosamente');
    }
  });

  db.client.query(dropTableTipoCuentasQuery, (err, result) => {
    if (err) {
      console.error('Error al eliminar la tabla tipocuentas:', err);
    } else {
      console.log('Tabla tipocuentas eliminada exitosamente');
    }
  });

  db.client.query(dropTableTipoMonedasQuery, (err, result) => {
    if (err) {
      console.error('Error al eliminar la tabla tipomonedas:', err);
    } else {
      console.log('Tabla tipomonedas eliminada exitosamente');
    }
  });

  db.client.query(dropTableBancosQuery, (err, result) => {
    if (err) {
      console.error('Error al eliminar la tabla bancos:', err);
    } else {
      console.log('Tabla bancos eliminada exitosamente');
    }
  });

  db.client.query(dropTableClientesQuery, (err, result) => {
    if (err) {
      console.error('Error al eliminar la tabla clientes:', err);
    } else {
      console.log('Tabla clientes eliminada exitosamente');
    }
  });
};

// Ejecutar la función para eliminar todas las tablas
//dropAllTables();
module.exports=dropAllTables;