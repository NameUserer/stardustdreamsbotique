document.addEventListener("DOMContentLoaded", async function () {
  await loadCartItems();
});

// Function to load wishlist items from the database
async function loadCartItems() {
  const wishlistContainer = document.getElementById("wishlist-items");

  try {
      const response = await fetch("/api/likes/check", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch wishlist");

      const wishlist = await response.json();
      wishlistContainer.innerHTML = ""; // Clear previous content

      if (wishlist.length === 0) {
          wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
          return;
      }

      wishlist.forEach((product) => {
        // Create Card
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
        buyButton.addEventListener("click", () => addToCart(product));

        // Wishlist Remove Button
        const wishlistButton = document.createElement("a");
        wishlistButton.href = "#";
        wishlistButton.classList.add("btn", "wishlist");
        wishlistButton.textContent = "♥";
        wishlistButton.addEventListener("click", () => removeFromWishlist(product.product_id));

        cardFooterDiv.append(buyButton, wishlistButton);

        // Assemble Card
        cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
        wishlistContainer.appendChild(cardDiv);

        console.log(product)
    });
  
      console.log("lefut");

    } catch (error) {
      console.error("Error loading cart:", error);
  }
}
  function removeItemFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  function updateCheckoutBar() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById("cart-count").textContent = totalItems;
    document.getElementById("cart-total").textContent = totalPrice.toFixed(2);
}

// Run on page load to update checkout bar
document.addEventListener("DOMContentLoaded", updateCheckoutBar);

function fetchCartFromDatabase() {
  fetch("/get_cart.php") // Replace with your API endpoint
      .then(response => response.json())
      .then(cart => {
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCheckoutBar();
      })
      .catch(error => console.error("Error fetching cart:", error));
}

// Call it when user logs in
fetchCartFromDatabase();