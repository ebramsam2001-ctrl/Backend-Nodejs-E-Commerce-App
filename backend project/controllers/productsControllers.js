const Product = require("../models/Product");

const getAllProducts = async (request, response, next) => {
    try {
        const products = await Product.find()
                                      .populate('categoryID', 'name')
                                      .populate('createdBy', 'name');

        if (!products || products.length === 0) {
            return response.status(200).json({
                success: true,
                message: "No products found",
                data: []
            });
        }

        response.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        next(error);
    }
};

const getProductByID = async (request, response, next) => {
    try {
        const product = await Product.findById(request.params.id)
            .populate('categoryID', 'name')
            .populate('createdBy', 'name email');

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            return next(error);
        }

        response.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

const createProduct = async (request, response, next) => {
    try {
        if (request.file) { 
            request.body.image = request.file.filename;
        }

        request.body.createdBy = request.user._id;
        const newProduct = await Product.create(request.body);
        
        response.status(201).json({
            success: true,
            newProduct
        });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (request, response, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            request.params.id,
            request.body,
            {
                new: true,
                runValidators: true
            },
        );

        if (!updatedProduct) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            return next(error);
        }

        response.status(200).json({
            success: true,
            updatedProduct
        });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (request, response, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(request.params.id);

        if (!deletedProduct) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            return next(error);
        }

        response.status(200).json({
            success: true,
            message: "Product deleted"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct,
};