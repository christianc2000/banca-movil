const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_secret = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, jwt_secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    req.usuario = decoded; // Establecer el objeto decodificado en req.usuario
    next();
  });
}

module.exports = verificarToken;


  
  module.exports = verificarToken;
  