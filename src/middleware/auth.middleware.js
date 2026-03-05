const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized.error');
const { JWT_SECRET } = require('../config/server.config');

function authMiddleware(req, res, next) {


    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new UnauthorizedError('No token provided'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new UnauthorizedError('Token has expired. Please login again.'));
        }
        return next(new UnauthorizedError('Invalid token'));
    }
}

module.exports = authMiddleware;