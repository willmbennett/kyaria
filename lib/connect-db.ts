import _mongoose, { connect } from "mongoose";

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.length === 0) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("🚀 Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("✅ New connection established");

        // Print the names of all models registered on this connection.
        const registeredModels = mongoose.modelNames();
        console.log("Registered Mongoose Models:", registeredModels);

        // Iterate through each model to print validations
        registeredModels.forEach((modelName) => {
          const model = mongoose.model(modelName);
          console.log(`Validations for model ${modelName}:`);

          Object.entries(model.schema.paths).forEach(([pathName, pathValue]) => {
            if (pathValue.validators && pathValue.validators.length > 0) {
              console.log(`  Field: ${pathName}`);
              pathValue.validators.forEach((validator) => {
                console.log(`    Validator: ${validator?.validator?.name}`);
                console.log(`    Message: ${validator.message}`);
              });
            }
          });
        });

        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Connection to database failed");
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;