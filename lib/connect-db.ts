import mongoose from 'mongoose'
declare global {
  var mongoose: any // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  //console.log("dbConnect: Starting database connection process...");

  if (cached.conn) {
    //console.log("dbConnect: Using existing database connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    //console.log("dbConnect: Creating new connection promise.");
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return { conn: mongoose, db: mongoose.connection.db };
      })
      .catch((error) => {
        //console.error("dbConnect: Error in mongoose.connect:", error);
        throw error;
      });
  }

  try {
    //console.log("dbConnect: Awaiting connection promise...");
    cached.conn = await cached.promise;
    //console.log("dbConnect: Database connection established.");
  } catch (e) {
    console.error("dbConnect: Error establishing database connection:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect