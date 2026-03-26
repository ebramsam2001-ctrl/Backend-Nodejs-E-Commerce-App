const Category = require("../models/Category");

const getAllCategories = async (request, response, next) => {
    try {
        const categories = await Category.find()
                                         .select("-__v");

        response.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        next(error);
    }
};

const getCategoryById = async (request, response, next) => {
    try {
        const category = await Category.findById(request.params.id)
                                       .select('-__v');

        if (!category) {
            const error = new Error("Category not found");
            error.statusCode = 404;
            return next(error);
        }

        response.status(200).json({
            success: true,
            category
        });
    } catch (error) {
        next(error);
    }
};

const createCategory = async (request, response, next) => {
    try {
        const newCategory = await Category.create(request.body);
        
        response.status(201).json({
            success: true,
            newCategory
        });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (request, response, next) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            request.params.id,
            request.body,
            {
                new: true,
                runValidators: true
            },
        );

        if (!updatedCategory) {
            const error = new Error("Category not found");
            error.statusCode = 404;
            return next(error);
        }

        response.status(200).json({
            success: true,
            updatedCategory
        });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (request, response, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(request.params.id);

        if (!deletedCategory) {
            const error = new Error("Category not found");
            error.statusCode = 404;
            return next(error);
        }

        response.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};