const jwt = require('jsonwebtoken');
const UserSchema = require('../models/UserSchema');

const authenticationMiddleware = async (req, res, next) => {
    console.log(req.cookies)
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized Authentication' });
    }
    if (!authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized Authentication' });
    }
    const token = authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!payload) {
        return res.status(401).json({ error: 'Unauthorized Authentication' });
    }
    const user = await UserSchema.findById(payload.id)
    if (user.tokenVersion !== payload.tokenVersion) {
        return res.status(401).json({ error: 'Token has been revoked' });
    }
    req.user = {
        id: payload.id,
        role: payload.role,
        tokenVersion: payload.tokenVersion
    }

    next();
}

module.exports = authenticationMiddleware;