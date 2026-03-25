const productSchema = require('../validators/productValidation');
const categorySchema = require("../validators/categoryValidation");

const productValidation = () => {
    return (request, response, next) => {
        const { error } = productSchema.validate(
            request.body,
            {
                abortEarly: false
            }
        );
        
        if (error) {
            const errorMessage = error.details.map(detail => detail.message)
                                              .join(', ');
            const validationError = new Error(errorMessage);
            validationError.statusCode = 400;
            return next(validationError);
        }
        
        next();
    };
};

const categoryValidation = () => {
    return (request, response, next) => {
        const { error } = categorySchema.validate(
            request.body,
            {
                abortEarly: false
            }
        );
        
        if (error) {
            const errorMessage = error.details.map(detail => detail.message)
                                              .join(', ');
            const validationError = new Error(errorMessage);
            validationError.statusCode = 400;
            return next(validationError);
        }
        
        next();
    };
};

module.exports = { productValidation, categoryValidation };