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

  async function removeItemFromCart(productId) {
    try {
        const response = await fetch(`/api/cart/${productId}`, { method: "DELETE", credentials: "include" });
        if (!response.ok) throw new Error("Failed to remove item");
  
        // Reload cart after successful removal
        await loadCartItems();
    } catch (error) {
        console.error("Error removing from cart:", error);
    }
  }


  document.addEventListener("DOMContentLoaded", function () {
    updateCartSummary();
});

function updateCartSummary() {
    const userId = getUserId(); // You should implement how you retrieve the user ID.

    fetch(`/cart/summary?user_id=${userId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('cart-count').textContent = data.totalItems;
            document.getElementById('cart-total').textContent = data.totalCost.toFixed(2);
        })
        .catch(error => console.error('Error fetching cart summary:', error));
}

function getUserId() {
    // Replace this with actual logic to get the logged-in user ID
    return 1;
}