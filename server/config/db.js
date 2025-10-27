const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected: ", connect.connection.host);
    } catch (error) {

        console.log('MongoDB connection failed error:', error.message);
    }

}

module.exports = connectDB;