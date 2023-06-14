const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/databaseConection/dbconection');
const app = express();
const { createClientesTable, createTipoCuentaTable, createBancoTable, createTipoMonedaTable, createCuentaTable, createMovimientoTable } = require('./src/databaseConection/tablas')


require('dotenv').config()//Variable de entorno
//const keys = require('./settings/keys');//keys
const puerto = process.env.PORT || 5000;//PUERTO DEL SERVER


//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//********************************* */


app.listen(puerto, async () => {
    try {
        await db.conexion();
        //Crear tabla cliente
        // createClientesTable();
        // createTipoCuentaTable();
        // createBancoTable();
        // createTipoMonedaTable();
        //createCuentaTable();
       // createMovimientoTable();
        console.log('Conexión exitosa a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
        process.exit(1);
    }
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});

// routes
app.use('/api', require('./src/route/index.routes'));
