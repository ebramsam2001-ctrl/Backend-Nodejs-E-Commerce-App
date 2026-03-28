const Joi = require("joi");

const regesterSchema = Joi.object({
    name: Joi.string()
             .trim()
             .min(3)
             .max(50)
             .required()
             .messages({
                'string.empty': 'Name cannot be empty',
                'any.required': 'Name is required',
             }),
    email: Joi.string()
              .email()
              .lowercase()
              .trim()
              .required()
              .messages({
                'string.email': 'Please provide a valid email address'
              }),
    password: Joi.string()
                 .min(6)
                 .required()
                 .messages({
                    'string.min': 'Password must be at least 6 characters long'
                 }),
    role: Joi.string()
             .valid('user', 'admin')
             .default('user'),
});


const regesterValidation = (request, response, next) => {
    const { error } = regesterSchema.validate(request.body, { abortEarly: false });

    if(error) {
        const messages = error.details.map((d) => d.message);
        return response.status(422).json({
            success: false,
            message: "Validation failed",
            errors: messages,
        });
    }
    next();
};

module.exports = regesterValidation;