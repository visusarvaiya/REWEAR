// Import required packages
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Import database connection
const connectDB = require("./config/db");

// Import routes
const itemRoutes = require("./routes/itemRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/items", itemRoutes);

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Page Not Found",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});