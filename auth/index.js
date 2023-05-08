const jwt = require('jsonwebtoken');
const config = require('../config/config');


const secret = config.jwtSecret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner, next) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        if (decoded.id !== owner) {
            next('No puedes hacer esto');
        }
    },

    loggeg: function(req, owner, next) {
        const decoded = decodeHeader(req, next);

    },
}

function getToken(auth) {
    if (!auth) {
        throw new Error('No viene token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req, next) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization, next);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};