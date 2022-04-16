// Connecting mongodb
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        // connect with mongoose
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);

    } catch (error) {
        console.log(error);
        // Exit the process with Failure (1)
        process.exit(1);
    }
}

module.exports = connectDB