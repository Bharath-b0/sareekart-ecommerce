// ============================================================
// Product Model
// ============================================================

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    category: {
      type: String,
      default: "Saree",
    },
    fabric: {
      type: String,
      default: "Silk",
    },
    color: {
      type: String,
      default: "Multicolor",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
