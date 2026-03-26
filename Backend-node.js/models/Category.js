const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true,
            minlength: [3, "Category name must be at least 3 characters"],
            maxlength: [32, "Category name is too long"],
        },
        description: {
            type: String,
            required: [true, "Category description is required"],
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;