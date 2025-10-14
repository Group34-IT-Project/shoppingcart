// database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Trying to connect to database...');
        await mongoose.connect('mongodb://localhost:27017/shoppingcart');
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed:', error);
    }
};

module.exports = connectDB;