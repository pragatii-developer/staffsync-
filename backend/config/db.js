const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/staffsync_hrm', {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB: ${error.message}. Running in fallback/mock mode without database.`);
  }
};

module.exports = connectDB;
