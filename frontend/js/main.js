// ============================================================
// SareeKart — Main JavaScript (Shared Utilities)
// ============================================================

/* ── Cart Utilities ────────────────────────────────────────── */

/**
 * Get cart items from localStorage
 * @returns {Array} Array of cart item objects
 */
function getCart() {
  return JSON.parse(localStorage.getItem("sareekart_cart") || "[]");
}

/**
 * Save cart to localStorage
 * @param {Array} cart
 */
function saveCart(cart) {
  localStorage.setItem("sareekart_cart", JSON.stringify(cart));
  updateCartCount();
}

/**
 * Add item to cart (prevent duplicates by ID)
 * @param {Object} product
 */
function addToCart(product) {
  const cart = getCart();
  const exists = cart.find((item) => item._id === product._id);
  if (exists) {
    showNotification("Already in cart!", "info");
    return;
  }
  cart.push(product);
  saveCart(cart);
  showNotification(`${product.name} added to cart! 🛍️`, "success");
}

/**
 * Remove item from cart by ID
 * @param {string} productId
 */
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item._id !== productId);
  saveCart(cart);
}

/**
 * Get total number of items in cart
 */
function getCartCount() {
  return getCart().length;
}

/**
 * Update cart count badge in navbar
 */
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    const count = getCartCount();
    countEl.textContent = count;
    countEl.style.display = count > 0 ? "flex" : "none";
  }
}

/* ── Notification Toast ────────────────────────────────────── */

/**
 * Show a floating toast notification
 * @param {string} message
 * @param {string} type - "success" | "info" | "error"
 */
function showNotification(message, type = "success") {
  // Remove existing notifications
  const existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: ${type === "success" ? "#2E7D32" : type === "error" ? "#C62828" : "#1565C0"};
    color: white;
    padding: 14px 22px;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideInToast 0.4s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
  toast.textContent = `${icon} ${message}`;

  // Add animation keyframe if not present
  if (!document.getElementById("toast-style")) {
    const style = document.createElement("style");
    style.id = "toast-style";
    style.textContent = `
      @keyframes slideInToast {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ── Navbar ────────────────────────────────────────────────── */

/**
 * Initialize navbar scroll effect and mobile toggle
 */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  // Scroll class
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("mobile-open");
      }
    });
  }

  // Mark active nav link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  updateCartCount();
}

/* ── Format Price ──────────────────────────────────────────── */

/**
 * Format a number as Indian Rupee
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

/* ── Init on DOM Ready ─────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", initNavbar);
