const signToken = require("../utils_JWT/jwt");
const User = require("../models/User");

const register = async (request, response, next) => {
    try {
        const { name, email, password, role } = request.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("A user with this email already exists");
            error.statusCode = 409;
            return next(error);
        }

        const user = await User.create({ 
            name, 
            email, 
            password, 
            role 
        });

        const token = signToken(user._id, user.role);

        return response.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            data: user
        });
    } catch (error) {
        next(error);
    }
};


const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            const error = new Error("Email and password are required");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            return next(error);
        }

        const token = signToken(user._id, user.role);

        user.password = undefined;

        return response.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const logout = (request, response, next) => {
    
    response.clearCookie("token");
    
    return response.status(200).json({
        success: true,
        message: "Logged out successfully. Please remove the token from local storage."
    });
};

module.exports = { register, login, logout };