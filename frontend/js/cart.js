// ============================================================
// SareeKart — Cart Page JS
// ============================================================

/**
 * Render the full cart page
 */
function renderCart() {
  const cart = getCart();
  const cartContainer = document.getElementById("cart-container");

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛍️</div>
        <h3>Your cart is empty</h3>
        <p style="margin-bottom:28px">Discover our beautiful collection of handcrafted sarees</p>
        <a href="collections.html" class="btn btn-primary btn-lg">Browse Collections</a>
      </div>`;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal >= 5000 ? 0 : 199;
  const total = subtotal + shipping;

  cartContainer.innerHTML = `
    <div class="cart-layout">
      <div>
        <h2 style="font-size:1.4rem;color:var(--maroon);margin-bottom:24px">
          Your Cart <span style="font-family:'Poppins',sans-serif;font-size:0.85rem;color:var(--text-light);font-weight:400">(${cart.length} item${cart.length !== 1 ? "s" : ""})</span>
        </h2>
        <div class="cart-items-list" id="cart-items-list">
          ${cart.map((item) => renderCartItem(item)).join("")}
        </div>
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span style="color:${shipping === 0 ? "#2E7D32" : "inherit"}">${shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
        </div>
        ${shipping > 0 ? `<p style="font-size:0.78rem;color:var(--text-light);margin-bottom:12px">Add ${formatPrice(5000 - subtotal)} more for free shipping</p>` : ""}
        <div class="summary-row total">
          <span>Total</span>
          <span>${formatPrice(total)}</span>
        </div>
        <a href="payment.html" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:16px">
          🔒 Proceed to Checkout
        </a>
        <a href="collections.html" class="btn btn-outline" style="width:100%;justify-content:center;margin-top:10px">
          Continue Shopping
        </a>
        <div style="margin-top:16px;text-align:center;font-size:0.78rem;color:var(--text-light)">
          🔒 Secure & Encrypted Checkout
        </div>
      </div>
    </div>`;
}

/**
 * Render a single cart item row
 * @param {Object} item
 * @returns {string} HTML string
 */
function renderCartItem(item) {
  return `
    <div class="cart-item" id="cart-item-${item._id}">
      <div class="cart-item-img">
        <img src="${item.imageUrl}" alt="${item.name}"
             onerror="this.src='https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80'">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-fabric">${item.fabric || "Silk"} · ${item.color || "Multicolor"}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
      </div>
      <button class="cart-item-remove" onclick="handleRemove('${item._id}')" title="Remove item">✕</button>
    </div>`;
}

/**
 * Handle remove from cart and re-render
 * @param {string} productId
 */
function handleRemove(productId) {
  removeFromCart(productId);
  renderCart();
  showNotification("Item removed from cart", "info");
}

document.addEventListener("DOMContentLoaded", renderCart);
