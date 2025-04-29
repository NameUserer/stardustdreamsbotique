// Fetch and display all products on page load
window.onload = async () => {
  try {
    // Always refresh products when page loads
    const products = await getProducts();
    displayResults(products);
    
    // Add a storage event listener to detect changes to localStorage
    window.addEventListener('storage', function(e) {
      if (e.key === 'wishlist') {
        // Refresh products when wishlist changes in another tab/window
        getProducts().then(products => displayResults(products));
      }
    });
    
    // Check every second if wishlist has changed (for same-tab changes)
    let lastWishlist = localStorage.getItem('wishlist');
    setInterval(() => {
      const currentWishlist = localStorage.getItem('wishlist');
      if (currentWishlist !== lastWishlist) {
        lastWishlist = currentWishlist;
        getProducts().then(products => displayResults(products));
      }
    }, 1000);
  } catch (error) {
    console.error("Error on window load:", error);
  }
};

// Fetch all or filtered products
async function getProducts(queryParams = "") {
  let url = `/api/products/getALLproduct`;

  if (queryParams) {
    url += `?${queryParams}`;
  }

  console.log("Fetching from:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include"
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const products = await response.json();
    console.log("Fetched products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Display results in the UI
function displayResults(products) {
  console.log("Displaying products:", products);
  renderProducts(products);
}

// Render product cards
function renderProducts(products) {
  console.log(`renderProducts: ${products}`);
  const row = document.getElementById("row");
  row.innerHTML = "";
  
  // IMPORTANT: Always get fresh data from localStorage
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  console.log("Current wishlist at render time:", wishlist);

  for (const product of products) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.width = "18rem";
    
    // Card Image
    const cardImg = document.createElement("img");
    cardImg.src = `/uploads/${product.product}`;
    cardImg.classList.add("pic-div");
    cardImg.alt = product.product_name;
    
    // Card Body
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body", "d-flex", "flex-column");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = product.product_name;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = product.description;

    const priceText = document.createElement("p");
    priceText.textContent = `$${product.price}`;
    
    cardBodyDiv.append(cardTitle, cardText, priceText);
    
    // Card Footer
    const cardFooterDiv = document.createElement("div");
    cardFooterDiv.classList.add("card-footer", "d-flex", "justify-content-between", "align-items-center");
    
    // Buy Button
    const buyButton = document.createElement("a");
    buyButton.href = "#";
    buyButton.classList.add("btn", "cart");
    buyButton.textContent = "Buy";
    buyButton.addEventListener("click", () => purchaseProduct(product.product_id, product.quantity));

    // Wishlist Button
    const wishlistButton = document.createElement("button");
    wishlistButton.classList.add("wishlist-button");
    
    // Create heart element
    const heartSpan = document.createElement("span");
    heartSpan.classList.add("heart");
    wishlistButton.appendChild(heartSpan);
    
    // CRITICAL: Check if product is in wishlist and set class accordingly
    const isInWishlist = wishlist.some(item => String(item.id) === String(product.product_id));
    console.log(`Product ${product.product_id} in wishlist: ${isInWishlist}`);
    
    // Set the initial state AFTER the element is created
    if (isInWishlist) {
      wishlistButton.classList.add("active");
    } else {
      wishlistButton.classList.remove("active");
    }
    
    // Use toggleWishlist function for click handler
    wishlistButton.addEventListener("click", function() {
      toggleWishlist(product.product_id, product.product_name)
        .then(() => {
          // Get fresh wishlist data after toggle
          const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          const nowInWishlist = updatedWishlist.some(item => 
            String(item.id) === String(product.product_id)
          );
          
          // Update class based on current wishlist state
          if (nowInWishlist) {
            this.classList.add("active");
          } else {
            this.classList.remove("active");
          }
        });
    });

    cardFooterDiv.append(buyButton, wishlistButton);
    
    // Append elements
    cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
    document.getElementById("row").append(cardDiv);
  }
}

// Wishlist functions
async function likeProduct(product_id) {
  try {
    const res = await fetch(`/api/likes/${product_id}`, {
      method: "POST",
      credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      getProducts();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
}

async function unlikeProduct(product_id) {
  try {
    const res = await fetch(`/api/like/${product_id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      getProducts();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  } catch (error) {
    console.error("Error removing from wishlist:", error);
  }
}

// Add to cart function
const purchaseProduct = async (product_id, quantity) => {
  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
      },
      body: JSON.stringify({
        product_id: product_id,
        quantity: 1,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Product added to cart:", result);
    } else {
      console.error("Error:", result.error);
      console.log(product_id, quantity);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

// Toggle wishlist function
async function toggleWishlist(id, name) {
  try {
    const res = await fetch(`/api/wishlist/toggle/${id}`, {
      method: "POST", // vagy külön GET/POST/DELETE is lehet
      credentials: "include"
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Toggle failed");
    }

    return true;
  } catch (error) {
    console.error("Wishlist toggle error:", error);
  }
}