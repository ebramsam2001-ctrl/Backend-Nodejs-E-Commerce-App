const jwt = require('jsonwebtoken');

// Generate Token
const signToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

module.exports = signToken;