// Connection of MongoDB
import mongoose from "mongoose";
import { db } from "./config";
let MONGO_URI = db.uri;

const options = {
  autoIndex: true,
  minPoolSize: db.minPoolSize,
  maxPoolSize: db.maxPoolSize,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

// Create the database connection
mongoose
  .connect(MONGO_URI, options)
  .then(() => {
    console.log("✅ Mongoose connection established");
  })
  .catch((e) => {
    console.log("Mongoose connection error");
    console.log(e);
  });

mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose default connection open to " + MONGO_URI);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  console.log("❌ Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("✅ Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close();
  console.log(
    "Mongoose default connection disconnected through app termination"
  );
  process.exit(0);
});

export default mongoose.connection;
