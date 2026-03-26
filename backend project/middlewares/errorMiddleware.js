const errorMiddleware = (error, request, response, next) => {
    if (process.env.NODE_ENV !== "production") {
        console.error("Error: ", error);
    }

    let statusCode = error.statusCode || 500;
    let message = error.message;

    // --- Mongoose: Validation Error ---
    if (error.name === "ValidationError") {
        statusCode = 400;
        const messages = Object.values(error.errors).map(e => e.message);
        message = messages.join(", ");
    }

    // --- Mongoose: Duplicate Key Error ---
    if (error.code === 11000) {
        statusCode = 409;
        const field = Object.keys(error.keyValue)[0];
        message = `A record with this ${field} already exists`;
    }

    // --- Mongoose: Cast Error ---
    if (error.name === "CastError") {
        statusCode = 400;
        message = `Invalid value for field: ${error.path}`;
    }

    return response.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = errorMiddleware;