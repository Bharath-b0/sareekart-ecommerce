// ============================================================
// SareeKart — Payment Page JS
// ============================================================

/**
 * Load order summary from cart
 */
function loadOrderSummary() {
  const cart = getCart();
  const summaryContainer = document.getElementById("order-items");
  const totalEl = document.getElementById("order-total");

  if (!summaryContainer) return;

  if (cart.length === 0) {
    summaryContainer.innerHTML = `<p style="color:var(--text-light);font-size:0.88rem">Your cart is empty.</p>`;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal >= 5000 ? 0 : 199;
  const total = subtotal + shipping;

  summaryContainer.innerHTML = cart
    .map(
      (item) => `
    <div class="order-item">
      <span class="order-item-name">${item.name}</span>
      <span class="order-item-price">${formatPrice(item.price)}</span>
    </div>`
    )
    .join("") +
    `<div class="order-item">
      <span class="order-item-name" style="color:var(--text-light)">Shipping</span>
      <span class="order-item-price" style="color:${shipping === 0 ? "#2E7D32" : "inherit"}">${shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
    </div>`;

  if (totalEl) {
    totalEl.innerHTML = `
      <span>Total</span>
      <span>${formatPrice(total)}</span>`;
  }
}

/**
 * Format credit card number input with spaces
 */
function formatCardNumber(input) {
  let value = input.value.replace(/\D/g, "").substring(0, 16);
  input.value = value.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * Format expiry date with slash
 */
function formatExpiry(input) {
  let value = input.value.replace(/\D/g, "").substring(0, 4);
  if (value.length >= 2) {
    value = value.substring(0, 2) + "/" + value.substring(2);
  }
  input.value = value;
}

/**
 * Switch payment tab
 */
function switchTab(tab) {
  // Remove active state
  document.querySelectorAll(".pay-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".pay-panel").forEach(p => p.style.display = "none");

  // Activate selected tab
  document.querySelector(`[data-tab="${tab}"]`).classList.add("active");
  const panel = document.getElementById(`panel-${tab}`);
  if (panel) panel.style.display = "block";

  // Disable all inputs first
  document.querySelectorAll(".pay-panel input").forEach(input => {
    input.required = false;
  });

  // Enable required fields only for active tab
  if (tab === "card") {
    document.querySelectorAll("#panel-card input").forEach(input => {
      input.required = true;
    });
  }

  if (tab === "upi") {
    const upi = document.getElementById("upi-id");
    if (upi) upi.required = true;
  }
}

/**
 * Handle payment form submit → redirect to oops page
 */
function handlePayment(e) {
  e.preventDefault();
  const btn = document.getElementById("pay-btn");
  btn.textContent = "Processing...";
  btn.disabled = true;
  btn.style.opacity = "0.7";

  setTimeout(() => {
    window.location.href = "oops.html";
  }, 1800);
}

document.addEventListener("DOMContentLoaded", () => {
  loadOrderSummary();

  // Card number formatting
  const cardInput = document.getElementById("card-number");
  if (cardInput) cardInput.addEventListener("input", () => formatCardNumber(cardInput));

  const expiryInput = document.getElementById("expiry");
  if (expiryInput) expiryInput.addEventListener("input", () => formatExpiry(expiryInput));

  // Payment form
  const payForm = document.getElementById("payment-form");
  if (payForm) payForm.addEventListener("submit", handlePayment);

  // Tab switching
  document.querySelectorAll(".pay-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });
});
