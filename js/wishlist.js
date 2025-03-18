document.addEventListener("DOMContentLoaded", async function () {
  await loadWishlist();
});

// Function to load wishlist items from the database
async function loadWishlist() {
  const wishlistContainer = document.getElementById("wishlist-items");

  try {
      const response = await fetch("/api/like", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch wishlist");

      const wishlist = await response.json();
      wishlistContainer.innerHTML = ""; // Clear previous content

      if (wishlist.length === 0) {
          wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
          return;
      }

      wishlist.forEach((item) => {
          const wishlistItem = document.createElement("div");
          wishlistItem.classList.add("wishlist-item");
          wishlistItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="wishlist-img">
              <div class="wishlist-details">
                  <h3>${item.name}</h3>
                  <p>Price: $${item.price}</p>
              </div>
              <button class="remove-wishlist" data-id="${item.product_id}">Remove</button>
          `;
          wishlistContainer.appendChild(wishlistItem);
      });

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
async function removeFromWishlist(productId) {
  try {
      const response = await fetch(`/api/like/${productId}`, { method: "DELETE", credentials: "include" });
      if (!response.ok) throw new Error("Failed to remove item");

      // Reload wishlist after successful removal
      await loadWishlist();
  } catch (error) {
      console.error("Error removing from wishlist:", error);
  }
}