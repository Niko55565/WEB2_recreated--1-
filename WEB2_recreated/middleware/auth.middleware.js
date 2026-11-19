 const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'web2-secret-key';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Нет токена' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Нет токена' });
    }

    try {
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Неверный или просроченный токен' });
    }
};

module.exports = authMiddleware;
