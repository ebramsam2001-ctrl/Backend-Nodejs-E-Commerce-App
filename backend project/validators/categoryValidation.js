const Joi = require('joi');

const categoryValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(32)
        .required()
        .messages({
            'string.empty': 'Category name is required',
            'string.min': 'Category name must be at least 3 characters',
            'string.max': 'Category name is too long (max 32)',
        }),

    description: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Category description is required',
        })
});

module.exports = categoryValidationSchema;