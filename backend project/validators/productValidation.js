const Joi = require('joi');

const productValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Product name is required',
            'string.min': 'Name should be at least 3 characters',
        }),

    description: Joi.string()
        .trim()
        .required(),

    price: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.min': 'Price cannot be negative',
        }),

    image: Joi.string()
        .required(),

    categoryID: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid Category ID format',
        }),

    createdBy: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
});

module.exports = productValidationSchema;