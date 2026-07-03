const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  signup,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/authController");

// User Signup
router.post("/signup", signup);

// User Login
router.post("/login", login);

// User Logout
router.post("/logout", logout);

router.get("/me", auth, getCurrentUser);

module.exports = router;



/*POST /signup
      │
      ▼
authRoutes.js
      │
      ▼
authController.js
      │
      ▼
User Model
      │
      ▼
MongoDB*/