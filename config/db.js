const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect using the MongoDB URI from the .env file
    await mongoose.connect(process.env.MONGO_URI);

    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    // Display error if connection fails
    console.error("MongoDB Connection Failed:", error.message);

    // Stop the server
    process.exit(1);
  }
};

// Export the function so it can be used in app.js
module.exports = connectDB;