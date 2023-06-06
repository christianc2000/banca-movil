require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const conexion = async () => {
  try {
    await client.connect();
    console.log('Conexión exitosa a PostgreSQL');
    // Aquí puedes realizar consultas a la base de datos
  } catch (err) {
    console.error('Error al conectar a PostgreSQL', err);
  }
};

module.exports = {
  client,
  conexion
};
