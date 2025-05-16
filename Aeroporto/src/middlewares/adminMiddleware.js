const adminMiddleware = (request, response, next) => {
    if (!request.user || request.user.cargo !== 'admin') {
        return response.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }
    next();
};

module.exports = adminMiddleware;