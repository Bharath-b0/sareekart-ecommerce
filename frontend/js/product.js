// ============================================================
// SareeKart — Product Detail Page JS
// ============================================================

/**
 * Get product ID from URL query params
 * @returns {string|null}
 */
function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

/**
 * Fetch and render product details
 */
async function loadProduct() {
  const productId = getProductId();
  const container = document.getElementById("product-detail-container");

  if (!productId) {
    container.innerHTML = `<p style="text-align:center;color:var(--text-light);padding:80px 0">No product selected. <a href="collections.html" style="color:var(--maroon)">Browse collections →</a></p>`;
    return;
  }

  container.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Loading product...</p></div>`;

  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/api/products/${productId}`);
    if (!response.ok) throw new Error("Product not found");

    const data = await response.json();
    const product = data.data;

    // Update page title
    document.title = `${product.name} — SareeKart`;

    container.innerHTML = `
      <div class="product-detail-inner">
        <div class="product-detail-img fade-in-up">
          <img src="${product.imageUrl}" alt="${product.name}"
               onerror="this.src='https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'">
        </div>
        <div class="product-detail-info fade-in-up delay-2">
          <span style="display:inline-block;background:var(--gold-pale);color:var(--gold);padding:4px 14px;border-radius:20px;font-size:0.8rem;font-weight:500;border:1px solid var(--gold-light)">${product.category}</span>
          <h1 style="font-size:clamp(1.6rem,3vw,2.4rem);color:var(--maroon);margin:12px 0 0">${product.name}</h1>
          <div class="price-tag">${formatPrice(product.price)}</div>
          <p class="product-desc">${product.description}</p>
          <div class="product-meta">
            <div class="product-meta-item">
              <span class="meta-label">Fabric</span>
              <span class="meta-value">🧵 ${product.fabric || "Pure Silk"}</span>
            </div>
            <div class="product-meta-item">
              <span class="meta-label">Color</span>
              <span class="meta-value">🎨 ${product.color || "Multicolor"}</span>
            </div>
            <div class="product-meta-item">
              <span class="meta-label">Category</span>
              <span class="meta-value">🏷 ${product.category}</span>
            </div>
            <div class="product-meta-item">
              <span class="meta-label">Availability</span>
              <span class="meta-value" style="color:${product.inStock ? "#2E7D32" : "var(--maroon)"}">
                ${product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
              </span>
            </div>
          </div>
          <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:8px">
            <button class="btn btn-primary btn-lg" onclick='addToCart(${JSON.stringify(product)})'>
              🛍 Add to Cart
            </button>
            <a href="cart.html" class="btn btn-outline btn-lg">View Cart</a>
          </div>
          <div style="margin-top:24px;padding:16px;background:var(--cream);border-radius:12px;font-size:0.82rem;color:var(--text-light);display:flex;gap:20px;flex-wrap:wrap">
            <span>🚚 Free shipping above ₹5,000</span>
            <span>↩️ Easy 7-day returns</span>
            <span>🔒 Secure checkout</span>
          </div>
        </div>
      </div>`;
  } catch (error) {
    container.innerHTML = `
      <div style="text-align:center;padding:80px 0;color:var(--text-light)">
        <div style="font-size:3rem;margin-bottom:16px">😕</div>
        <h3 style="font-family:'Playfair Display',serif;color:var(--maroon);margin-bottom:8px">Product not found</h3>
        <p style="margin-bottom:24px">${error.message}</p>
        <a href="collections.html" class="btn btn-primary">Browse Collections</a>
      </div>`;
  }
}

document.addEventListener("DOMContentLoaded", loadProduct);
