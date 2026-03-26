const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(
            process.env.MONGO_URL || "mongodb://localhost:27017/e-commerceDB"
        );

        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch(error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;