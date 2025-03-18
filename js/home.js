// Fetch and display all products on page load
window.onload = async () => {
  try {
    const products = await getProducts();
    displayResults(products);
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
    cardFooterDiv.classList.add("card-footer", "d-flex", "justify-content-between");
    
    // Buy Button
    const buyButton = document.createElement("a");
    buyButton.href = "#";
    buyButton.classList.add("btn", "cart");
    buyButton.textContent = "Buy";
    buyButton.addEventListener("click", () => addToCart(product.product_id));

    // Wishlist Button
    const wishlistButton = document.createElement("a");
    wishlistButton.href = "#";
    wishlistButton.classList.add("btn", "wishlist");
    wishlistButton.textContent = "♥";
    wishlistButton.addEventListener("click", () => likeProduct(product.product_id));

    cardFooterDiv.append(buyButton, wishlistButton);
    
    // Append elements
    cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
    document.getElementById("row").append(cardDiv);
  }
}

// Wishlist functions
async function likeProduct(upload_id) {
  try {
    const res = await fetch(`/api/like/${upload_id}`, {
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

async function removewishlist(upload_id) {
  try {
    const res = await fetch(`/api/like/${upload_id}`, {
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
function addToCart(id, name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id, name, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Toggle wishlist function
async function toggleWishlist(id, name) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const index = wishlist.findIndex((item) => item.id === id);

  if (index > -1) {
    wishlist.splice(index, 1);
    await fetch(`/api/like/${id}`, { method: "DELETE", credentials: "include" });
  } else {
    wishlist.push({ id, name });
    await fetch(`/api/like/${id}`, { method: "POST", credentials: "include" });
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}