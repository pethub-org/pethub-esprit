const jwt = require('jsonwebtoken');
const UserSchema = require('../models/UserSchema');

const authenticationMiddleware = async (req, res, next) => {
    // try {
    const authorization = req.headers.authorization;
    let payload;

    if (!authorization) {
        console.log('no authorization header')
        return res.status(401).json({ error: 'Unauthorized Authentication' });
    }
    if (!authorization.startsWith('Bearer ')) {
        console.log('does not start with Bearer')
        return res.status(401).json({ error: 'Unauthorized Authentication' });
    }
    const token = authorization.split(' ')[1];

    try {
        payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        return res.status(403).json({ error: 'expired' })
    }
    if (!payload) {
        console.log('bad token')
        return res.status(403).json({ error: 'Unauthorized Authentication' });
    }
    const user = await UserSchema.findById(payload.id)

    if (user.tokenVersion !== payload.tokenVersion) {
        return res.status(401).json({ error: 'Token has been revoked' });
    }

    req.user = user;

    next();
    // } catch (error) {
    // next(error)
    // }
}

module.exports = authenticationMiddleware;