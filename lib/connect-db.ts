import _mongoose, { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.length === 0) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

async function connectDB() {
  const opts = {
    bufferCommands: false,
  };

  try {
    const connection = await connect(MONGODB_URI!, opts);
    console.log("✅ Connection to database established");
    return connection;
  } catch (error) {
    console.error("❌ Connection to database failed");
    throw error;
  }
}

export default connectDB;
