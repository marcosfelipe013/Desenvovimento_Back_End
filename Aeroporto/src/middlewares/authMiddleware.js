const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (request, response, next) => {
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
        return response.status(401).json({ error: 'Token não fornecido!' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        request.user = decoded;
        next();
    } catch (err) {
        return response.status(401).json({ error: 'Token inválido!' });
    }
};

module.exports = authMiddleware;