const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/grab_n_save';
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000, // Quick timeout to fallback if offline
    });
    
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Notice: ${error.message}`);
    console.log('🔄 Running in resilient in-memory/hybrid mode. All search, filtering, voting, and coupon features will operate smoothly.');
    isConnected = false;
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = {
  connectDB,
  getIsConnected,
};
