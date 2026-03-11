const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const { JWT_SECRET } = require('../config/server.config');

function authMiddleware(req, res, next) {

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Authorization token missing',
        });
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        next();

    } catch (err) {
        logger.warn(`Auth failed: ${err.message}`);
        return res.status(401).json({
            success: false,
            message: 'Token has expired or Invalid token',
        });
    }
}

module.exports = authMiddleware;