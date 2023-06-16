const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/databaseConection/dbconection');
const app = express();
const { createClientesTable, createTipoCuentaTable, createBancoTable, createTipoMonedaTable, createCuentaTable, createMovimientoTable } = require('./src/databaseConection/tablas')
const { addPassword, selectFrom, insertClientes, insertTipoCuentas, insertBancos, insertTipoMonedas, insertCuentas, insertMovimientos } = require('./src/databaseConection/poblacion');
const dropAllTables = require('./src/databaseConection/deletetable');

require('dotenv').config();//Variable de entorno
//const keys = require('./settings/keys');//keys
const puerto = process.env.PORT || 5000;//PUERTO DEL SERVER


//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//********************************* */


app.listen(puerto, async () => {
    try {
        await db.conexion();
        //*************Crear tablas********************
       // createClientesTable();
       // createTipoCuentaTable();
       // createBancoTable();
       // createTipoMonedaTable();
       // createCuentaTable();
       // createMovimientoTable();
        //*************Insertar datos*******************
        //await insertClientes();
        //insertTipoCuentas();
        //insertBancos();
        // insertTipoMonedas();
       // insertCuentas();
       // insertMovimientos()
        //addPassword('12345678',2);
        //addPassword('12345678',3);
        //addPassword('12345678',4);
        //await selectFrom();
        //***********Eliminar todas las tablas********* */
        //dropAllTables();
        console.log('Conexión exitosa a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
        process.exit(1);
    }
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});

// routes
app.use('/api', require('./src/route/index.routes'));
