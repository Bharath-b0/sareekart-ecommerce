// ============================================================
// Product Controller
// ============================================================

const Product = require("../models/Product");

// GET /api/products — Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ inStock: true }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/products/:id — Fetch single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, error: "Invalid product ID" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAllProducts, getProductById };
