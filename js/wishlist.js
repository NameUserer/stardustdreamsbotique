document.addEventListener("DOMContentLoaded", async function () {
  await loadWishlist();
});

// Function to load wishlist items from the database
async function loadWishlist() {
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

      wishlist.forEach(product => {
        /*const cardDiv = document.createElement("div");
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
    
      // Wishlist Button
      const wishlistButton = document.createElement("a");
      wishlistButton.href = "#";
      wishlistButton.classList.add("btn", "wishlist");
      wishlistButton.textContent = "♥";
      wishlistButton.addEventListener("click", () => addToWishlist(product));
    
      cardFooterDiv.append(buyButton, wishlistButton);
      */
     console.log(product);
    });

      console.log("lefut");
      // Attach event listeners to remove buttons
      document.querySelectorAll(".remove-wishlist").forEach((button) => {
          button.addEventListener("click", (e) => {
              const productId = e.target.getAttribute("data-id");
              removeFromWishlist(productId);
          });
      });

  } catch (error) {
      console.error("Error loading wishlist:", error);
  }
}

// Function to remove an item from the wishlist
async function unlikeProduct(productId) {
  try {
      const response = await fetch(`/api/likes/${productId}`, { method: "DELETE", credentials: "include" });
      if (!response.ok) throw new Error("Failed to remove item");

      // Reload wishlist after successful removal
      await loadWishlist();
  } catch (error) {
      console.error("Error removing from wishlist:", error);
  }
}