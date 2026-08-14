require('dotenv').config();
const { connectDB } = require('../config/db');
const storeService = require('../data/storeService');

async function runSeed() {
  console.log('🌱 Starting database seeding script...');
  const connected = await connectDB();
  if (connected) {
    await storeService.seedMongo();
    console.log('✨ Seeding finished successfully!');
    process.exit(0);
  } else {
    console.log('⚠️ Could not connect to live MongoDB instance. In-memory data store is loaded and ready for frontend use.');
    process.exit(0);
  }
}

runSeed();
