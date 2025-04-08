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
        buyButton.addEventListener("click", () => addToCart(product.product_id));

        // Wishlist Button
    const wishlistButton = document.createElement("button");
    wishlistButton.classList.add("wishlist-button");
    
    // Check if product is in wishlist and add active class if needed
    const isInWishlist = wishlist.some(item => item.id === product.product_id);
    if (isInWishlist) {
      wishlistButton.classList.add("active");
    }
    
    // Create heart element
    const heartSpan = document.createElement("span");
    heartSpan.classList.add("heart");
    wishlistButton.appendChild(heartSpan);
    
    // Use toggleWishlist function for click handler
    wishlistButton.addEventListener("click", function() {
      removeFromWishlist(product.product_id, product.product_name);
      this.classList.toggle("active");
    });

        cardFooterDiv.append(buyButton, wishlistButton);

        // Assemble Card
        cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
        wishlistContainer.appendChild(cardDiv);

        console.log(product)
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
function removeFromWishlist(productId) {
  // Get current wishlist
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
  // Remove the product from wishlist
  wishlist = wishlist.filter(item => item.id !== productId);
  
  // Update localStorage
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  
  // Also update the server if needed
  fetch(`/api/likes/${productId}`, { 
    method: "DELETE", 
    credentials: "include" 
  });
}

// Toggle wishlist function
async function toggleWishlist(id, name) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const index = wishlist.findIndex((item) => item.id === id);

  if (index > -1) {
    wishlist.splice(index, 1);
    await fetch(`/api/likes/${id}`, { method: "DELETE", credentials: "include" });
  } else {
    wishlist.push({ id, name });
    await fetch(`/api/likes/${id}`, { method: "POST", credentials: "include" });
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}