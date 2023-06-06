const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const verificarToken = require('./jwtMiddleware');

require('dotenv').config()//Variable de entorno
//const keys = require('./settings/keys');//keys
const puerto = process.env.PORT || 5000;//PUERTO DEL SERVER
const jwt_secret = process.env.JWT_SECRET;
console.log('jwt_secret: ',jwt_secret);
//console.log('key: '+keys.key);
//app.set('keys', keys.key);
//console.log('app key: '+app.get('keys'));
//app.use(express.urlencoded({extended:false}))
//app.use(express.json);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//********************************* */
app.post('/api/login/', (req, res) => {
    if (req.body.usuario == 'admin' && req.body.pass == '12345') {
        const payload = {
            check: true
        };
        const token = jwt.sign(payload, jwt_secret, {
            expiresIn: '7d'
        });
        res.json({
            message: '¡Autenticación Exitosa!',
            token: token
        })
    } else {
        res.json({
            message: 'Usuario y/o password son incorrectas'
        })
    }
});
//const secret = process.env.SECRET
app.get('/api/usuarios', verificarToken, (req, res) => {
    console.log("GET ENDPOINT USUARIO");
    res.json({ message: 'acceso correcto' });
});

app.post('/api/usuarios', (req, res) => {
    // Lógica para crear un nuevo usuario
    console.log("POST ENDPOINT USUARIO");
});

app.put('/api/usuarios/:id', (req, res) => {
    // Lógica para actualizar un usuario existente por su ID
    console.log("PUT ENDPOINT USUARIO");
});

app.delete('/api/usuarios/:id', (req, res) => {
    // Lógica para eliminar un usuario existente por su ID
    console.log("DELETE ENDPOINT USUARIO");

});

app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});
