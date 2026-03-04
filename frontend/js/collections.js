let allProducts = [];

async function loadProducts() {
  const grid = document.getElementById("products-grid");
  const loading = document.getElementById("loading-state");

  try {
    loading.style.display = "block";
    grid.innerHTML = "";

    // const response = await fetch(`${CONFIG.API_BASE_URL}/api/products`);
    // if (!response.ok) throw new Error("Failed to fetch");

    // const data = await response.json();
    // allProducts = data.data || [];
    const response = await fetch("data/products.json");
const data = await response.json();
allProducts = data;

    loading.style.display = "none";

    if (!allProducts.length) {
      grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:60px 0;">No products found.</p>`;
      return;
    }

    renderProducts(allProducts);

  } catch (err) {
    loading.style.display = "none";
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 0;">
        <h3>⚠ Unable to load products</h3>
        <p>Check backend at ${CONFIG.API_BASE_URL}</p>
      </div>`;
  }
}

function renderProducts(products) {
  const grid = document.getElementById("products-grid");

  grid.innerHTML = products.map(product => `
    <div class="product-card">

      <div class="product-image">
        <img src="${product.imageUrl || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80'}"
             alt="${product.name}" loading="lazy">
      </div>

      <div class="product-body">
        <span class="product-category">${product.category || "Saree"}</span>
        <h3>${product.name}</h3>
        <div class="product-price">₹${product.price}</div>

        <div class="product-actions">
          <a href="product.html?id=${product._id}" class="btn btn-outline">Details</a>
          <button class="btn btn-primary add-to-cart"
                  data-id="${product._id}">
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  `).join("");
}

function filterProducts(category) {
  if (category === "all") {
    renderProducts(allProducts);
    return;
  }

  const filtered = allProducts.filter(p =>
    p.category?.toLowerCase().includes(category.toLowerCase())
  );

  renderProducts(filtered.length ? filtered : allProducts);
}

document.addEventListener("click", function(e) {

  // Filter
  if (e.target.classList.contains("filter-btn")) {
    document.querySelectorAll(".filter-btn")
      .forEach(btn => btn.classList.remove("active"));

    e.target.classList.add("active");

    filterProducts(e.target.dataset.filter);
  }

  // Add to Cart
  if (e.target.classList.contains("add-to-cart")) {
    const id = e.target.dataset.id;
    const product = allProducts.find(p => p._id === id);
    if (product) addToCart(product);
  }

});

document.addEventListener("DOMContentLoaded", loadProducts);