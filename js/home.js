const filterDropdown = document.getElementById("filterDropdown");
const filterIcon = filterDropdown.querySelector(".filter-icon");
const dropdownContent = filterDropdown.querySelector(".dropdown-content");

if (filterIcon) {
  filterIcon.addEventListener("click", () => {
    filterDropdown.classList.toggle("open");
  });
}

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (filterDropdown && !filterDropdown.contains(e.target) && !e.target.matches(".dropdown-content input")) {
    filterDropdown.classList.remove("open");
  }
});

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

// Apply filters
async function applyFilters() {
  const selectedGames = Array.from(document.querySelectorAll('input[data-category="game"]:checked')).map(cb => cb.value);
  const selectedProducts = Array.from(document.querySelectorAll('input[data-category="product"]:checked')).map(cb => cb.value);

  const queryParams = new URLSearchParams();
  if (selectedGames.length > 0) queryParams.append("games", selectedGames.join(","));
  if (selectedProducts.length > 0) queryParams.append("products", selectedProducts.join(","));

  try {
    const filteredItems = await getProducts(queryParams.toString());
    displayResults(filteredItems);
    document.getElementById("filterDropdown").classList.remove("open");
  } catch (error) {
    console.error("Error applying filters:", error);
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
    cardImg.src = `/uploads/${product.image}`;
    cardImg.classList.add("card-img-top");
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
    buyButton.addEventListener("click", () => addToCart(product));

    // Wishlist Button
    const wishlistButton = document.createElement("a");
    wishlistButton.href = "#";
    wishlistButton.classList.add("btn", "wishlist");
    wishlistButton.textContent = "♥";
    wishlistButton.addEventListener("click", () => addToWishlist(product));

    cardFooterDiv.append(buyButton, wishlistButton);
    
    // Append elements
    cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
    document.getElementById("row").append(cardDiv);
  }
}

// Wishlist functions
async function wishlist(upload_id) {
  try {
    const res = await fetch(`/api/like/${upload_id}`, {
      method: "POST",
      credentials: "include",
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
function toggleWishlist(id, name) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const index = wishlist.findIndex((item) => item.id === id);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push({ id, name });
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}


function handleAccountClick() {
  let user = localStorage.getItem("user");

  if (user) {
    Swal.fire({
      title: "You're Logged In",
      text: "Do you want to log out?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Log Out",
      cancelButtonText: "Close"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        checkLoginStatus();
        Swal.fire("Logged Out!", "You have been logged out.", "success");
      }
    });
  } else {
    // Ask if they want to Log In or Sign Up
    Swal.fire({
      title: "Welcome!",
      text: "Would you like to log in or sign up?",
      imageUrl: "../img/barbara.png",
      imageWidth: 150,
      imageHeight: 350,
      imageAlt: "Custom image",
      showCancelButton: true,
      confirmButtonText: "Log In",
      cancelButtonText: "Sign Up",
      confirmButtonColor: "#362F67",
      cancelButtonColor: "#D6AEE9"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'login.html'; // Redirect to login page
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = 'registration.html'; // Redirect to sign up page
      }
    });
  }
}