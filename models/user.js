const mongoose = require("mongoose");

// Schema for storing user information
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150",
    },

    city: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    completedExchanges: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Export User model
module.exports = mongoose.model("User", userSchema);