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

// 2. Login Controller
const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            const error = new Error("Email and password are required");
            error.statusCode = 400;
            return next(error);
        }

        // جلب المستخدم مع كلمة السر للمقارنة
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            return next(error);
        }

        // توليد التوكن
        const token = signToken(user._id, user.role);

        // إخفاء كلمة السر
        user.password = undefined;

        // ملاحظة: بما أننا نستخدم JWT، لا نحتاج لتخزين البيانات في request.session
        // التوكن يحمل كل ما نحتاجه
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

// 3. Logout Controller
const logout = (request, response, next) => {
    // في نظام JWT، الـ Logout يتم غالباً من جهة الـ Frontend بحذف التوكن
    // لكن إذا كنت لا تزال تستخدم Cookies، نقوم بمسحها هنا
    response.clearCookie("token"); // أو اسم الكوكيز الخاص بك
    
    return response.status(200).json({
        success: true,
        message: "Logged out successfully. Please remove the token from local storage."
    });
};

module.exports = { register, login, logout };