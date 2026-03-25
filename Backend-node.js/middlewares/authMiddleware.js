const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (request, response, next) => {
    let token;

    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
        token = request.headers.authorization.split(' ')[1];
    }

    if (!token) {
        const error = new Error("Not authorized, no token provided");
        error.statusCode = 401;
        return next(error);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded.id).select('-password');
        
        if (!currentUser) {
            const error = new Error("The user belonging to this token no longer exists");
            error.statusCode = 401;
            return next(error);
        }

        // Attach user to the request object
        request.user = currentUser; 
        next();
    } catch (err) {
        const error = new Error("Invalid token, please login again");
        error.statusCode = 401;
        next(error);
    }
};

// Now 'authorize' automatically checks request.user.role
const authorize = (...roles) => {
    return (request, response, next) => {
        if (!roles || roles.length === 0) return next(); // If no roles specified, allow all logged in

        if (!roles.includes(request.user.role)) {
            const error = new Error(`Role (${request.user.role}) is not authorized to access this resource`);
            error.statusCode = 403;
            return next(error);
        }
        next();
    };
};

module.exports = { protect, authorize };