const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const auth = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "Access Denied. Please login first."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user using the ID stored in the token
    const user = await User.findById(decoded.id).select("-password"); // server knows who is user

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Attach user to request object
    req.user = user;
    //req.user.name 

    // Continue to the next middleware/controller
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or Expired Token"
    });
  }
};

module.exports = auth;