// Import the Item model
const Item = require("../models/Item");

// ==================== GET ALL ITEMS ====================
// Fetch all clothing items from the database
const getAllItems = async (req, res) => {
  try {
    // Find all items and display the newest first
    const items = await Item.find().sort({ createdAt: -1 });

    // Send all items as a JSON response
    res.json(items);
  } catch (error) {
    // Return error if something goes wrong
    res.status(500).json({ message: error.message });
  }
};

// ==================== GET SINGLE ITEM ====================
// Fetch one item using its unique ID
const getItemById = async (req, res) => {
  try {
    // Find item by ID from the URL
    const item = await Item.findById(req.params.id);

    // Check if item exists
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Send the item data
    res.json(item);
  } catch (error) {
    // Return server error
    res.status(500).json({ message: error.message });
  }
};

// ==================== ADD ITEM ====================
// Add a new clothing item
const addItem = async (req, res) => {
  try {
    // Create a new item using request body data
    const newItem = new Item(req.body);

    // Save the item into MongoDB
    const savedItem = await newItem.save();

    // Return the saved item with status 201 (Created)
    res.status(201).json(savedItem);
  } catch (error) {
    // Return validation or bad request error
    res.status(400).json({ message: error.message });
  }
};

// ==================== UPDATE ITEM ====================
// Update an existing item by ID
const updateItem = async (req, res) => {
  try {
    // Find the item and update it
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,     // Item ID
      req.body,          // Updated data
      {
        new: true,        // Return updated document
        runValidators: true // Validate updated data
      }
    );

    // Check if item exists
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Send updated item
    res.json(updatedItem);
  } catch (error) {
    // Return validation error
    res.status(400).json({ message: error.message });
  }
};

// ==================== DELETE ITEM ====================
// Delete an item by ID
const deleteItem = async (req, res) => {
  try {
    // Find and delete the item
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    // Check if item exists
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Send success message
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    // Return server error
    res.status(500).json({ message: error.message });
  }
};

// Export all controller functions
module.exports = {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};