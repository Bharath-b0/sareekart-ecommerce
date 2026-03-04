// ============================================================
// Contact Controller
// ============================================================

const Contact = require("../models/Contact");

// POST /api/contact — Save contact message
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Please provide name, email, and message",
      });
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! We'll get back to you shortly.",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        submittedAt: contact.createdAt,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: messages.join(", ") });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { submitContact };
