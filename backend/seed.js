// ============================================================
// SareeKart - Database Seed Script
// Run: node seed.js
// ============================================================

const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const sarees = [
  {
    name: "Kanjivaram Silk Saree",
    description:
      "A magnificent Kanjivaram silk saree woven with pure mulberry silk and zari. Features traditional temple border motifs and rich gold pallu. Perfect for weddings and grand celebrations.",
    price: 12500,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    category: "Silk Saree",
    fabric: "Pure Silk",
    color: "Deep Maroon",
  },
  {
    name: "Banarasi Georgette Saree",
    description:
      "Luxurious Banarasi georgette saree with intricate silver and gold zari work. The flowing fabric drapes elegantly and the floral motifs add a timeless charm. Ideal for festive occasions.",
    price: 8900,
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    category: "Georgette Saree",
    fabric: "Georgette",
    color: "Royal Blue",
  },
  {
    name: "Chanderi Cotton Silk Saree",
    description:
      "Lightweight Chanderi cotton-silk saree with delicate gold butas and a sheer texture. The shimmering finish makes it perfect for summer festivities and day events.",
    price: 4200,
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
    category: "Cotton Silk",
    fabric: "Cotton Silk",
    color: "Ivory Gold",
  },
  {
    name: "Paithani Silk Saree",
    description:
      "Authentic Paithani saree from Maharashtra with peacock and lotus motifs in vibrant colors. The signature oblique square design on the pallu is handwoven by master artisans.",
    price: 18000,
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e08?w=600&q=80",
    category: "Silk Saree",
    fabric: "Pure Silk",
    color: "Peacock Green",
  },
  {
    name: "Chiffon Embroidered Saree",
    description:
      "Elegant chiffon saree with delicate thread embroidery and sequin work throughout. The soft, flowing fabric creates a graceful silhouette. Perfect for cocktail parties and receptions.",
    price: 3500,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    category: "Chiffon Saree",
    fabric: "Chiffon",
    color: "Blush Pink",
  },
  {
    name: "Tussar Silk Saree",
    description:
      "Natural Tussar silk saree with hand-painted tribal motifs and earthy tones. The wild silk texture gives it a unique, eco-luxe appeal. A celebration of Indian tribal artistry.",
    price: 6700,
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    category: "Silk Saree",
    fabric: "Tussar Silk",
    color: "Earthy Ochre",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert new seed data
    const inserted = await Product.insertMany(sarees);
    console.log("🌱 Seeded " + inserted.length + " sarees successfully!");

    inserted.forEach((p) => console.log("  ➤ " + p.name + " (₹" + p.price + ")"));

    mongoose.disconnect();
    console.log("✅ Disconnected. Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();
