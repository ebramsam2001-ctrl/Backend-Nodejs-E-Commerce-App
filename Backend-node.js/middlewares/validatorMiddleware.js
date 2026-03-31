const Validation = (schema) => {
    return (request, response, next) => {
        const { error, value } = schema.validate(request.body, { abortEarly: false });
        
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            const validationError = new Error(errorMessage);
            validationError.statusCode = 400;
            return next(validationError);
        }

        request.body = value;
        next();
    };
};

module.exports = { Validation };