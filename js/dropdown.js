const filterDropdown = document.getElementById("filterDropdown");
const filterIcon = filterDropdown.querySelector(".filter-icon");
const dropdownContent = filterDropdown.querySelector(".dropdown-content");

// Toggle dropdown on icon click
filterIcon.addEventListener("click", () => {
  filterDropdown.classList.toggle("open");
});

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (!filterDropdown.contains(e.target)) {
    filterDropdown.classList.remove("open");
  }
});

// Fetch all products from the backend on page load
window.onload = async () => {
  const products = await fetchProducts();
  displayResults(products);
};

// Apply filters and fetch filtered results
async function applyFilters() {
  // Get selected colors and shapes
  const selectedColors = Array.from(document.querySelectorAll('input[data-category="color"]:checked')).map(cb => cb.value);
  const selectedShapes = Array.from(document.querySelectorAll('input[data-category="shape"]:checked')).map(cb => cb.value);

  // Prepare filter query for the backend
  const query = {
    colors: selectedColors,
    shapes: selectedShapes
  };

  // Fetch filtered results from the backend
  const filteredItems = await fetchProducts(query);

  displayResults(filteredItems); // Show filtered results
  filterDropdown.classList.remove("open"); // Close dropdown
}

// Fetch products from the backend (all or filtered)
async function fetchProducts(filters = {}) {
  const url = new URL("https://nodejs313.dszcbaross.edu.hu"); // Replace with your backend endpoint

  // Append query parameters for filters if they exist
  if (filters.colors && filters.colors.length > 0) {
    url.searchParams.append("colors", filters.colors.join(","));
  }
  if (filters.shapes && filters.shapes.length > 0) {
    url.searchParams.append("shapes", filters.shapes.join(","));
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }
    return await response.json(); // Assuming the response is JSON
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Display results in the frontend
function displayResults(items) {
  const resultsDiv = document.getElementById("results");
  if (items.length === 0) {
    resultsDiv.innerHTML = '<p>No results found. Adjust your filters and try again.</p>';
    return;
  }

  // Generate product cards
  resultsDiv.innerHTML = items.map(item => `
    <div class="product-card">
      <img src="${item.image}" alt="${item.name}" class="product-image" />
      <h3 class="product-title">${item.name}</h3>
      <p class="product-description">${item.description}</p>
      <div class="product-actions">
        <button class="wishlist-button" onclick="addToWishlist('${item.id}')">Wishlist</button>
        <button class="cart-button" onclick="addToCart('${item.id}')">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// Placeholder functions for wishlist and cart actions
function addToWishlist(productId) {
  alert(`Product ${productId} added to wishlist!`);
}

function addToCart(productId) {
  alert(`Product ${productId} added to cart!`);
}