const jwt = require("jsonwebtoken");

const generateToken = (user, type) => {
    let token;

    const tokensTypes = ['access_token', 'refresh_token', 'email_token'];

    if (!type || !tokensTypes.includes(type)) {
        throw new Error(`can not generate this type of token : ${type}`)
    }

    if (type === 'access_token') {
        token = jwt.sign({ id: user._id, role: user.role, tokenVersion: user.tokenVersion }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d',
            // algorithm: 'RS256',
        })
    }
    if (type === 'refresh_token') {
        token = jwt.sign({ id: user._id, role: user.role, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '14d',
            // algorithm: 'RS256',
        })
    }

    if (type === 'email_token') {
        token = jwt.sign({ id: user._id, role: user.role, tokenVersion: user.tokenVersion }, process.env.EMAIL_TOKEN_SECRET, {
            expiresIn: '30m',
            // algorithm: 'RS256',
        })
    }

    return token;
}

module.exports = generateToken;
