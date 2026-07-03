const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

// ==================== ROUTES ====================

// GET all items
router.get("/", getAllItems);

// GET single item by ID
router.get("/:id", getItemById);

// POST a new item
router.post("/", addItem);

// PUT (Update) an existing item
router.put("/:id", updateItem);

// DELETE an item
router.delete("/:id", deleteItem);

// Export router
module.exports = router;