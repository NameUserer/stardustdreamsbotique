document.addEventListener("DOMContentLoaded", async function () {
  await loadCartItems();
});

// Function to load cart items from the database
async function loadCartItems() {
  const cartContainer = document.getElementById("cart-items");

  try {
      const response = await fetch("/api/likes/check", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch cart");

      const cart = await response.json();
      cartContainer.innerHTML = ""; // Clear previous content

      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
          return;
      }

      wishcartlist.forEach((product) => {
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
        cardFooterDiv.classList.add("card-footer", "d-flex", "justify-content-between", "align-items-center");

        // Quantity Controls
        const quantityDiv = document.createElement("div");
        quantityDiv.classList.add("d-flex", "align-items-center");

        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
        minusButton.addEventListener("click", () => {
          if (product.quantity > 1) {
              product.quantity--;
              quantitySpan.textContent = product.quantity;
          }
});

const quantitySpan = document.createElement("span");
quantitySpan.textContent = product.quantity || 1;
quantitySpan.classList.add("mx-2");

const plusButton = document.createElement("button");
plusButton.textContent = "+";
plusButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
plusButton.addEventListener("click", () => {
    product.quantity++;
    quantitySpan.textContent = product.quantity;
});

quantityDiv.append(minusButton, quantitySpan, plusButton);

// Remove Button
const removeButton = document.createElement("button");
removeButton.textContent = "Remove";
removeButton.classList.add("btn", "btn-danger", "btn-sm");
removeButton.addEventListener("click", () => removeFromCart(product.product_id));

cardFooterDiv.append(quantityDiv, removeButton);

        // Assemble Card
        cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
        cartContainer.appendChild(cardDiv);

        console.log(product)
    });
  
      console.log("lefut");

    } catch (error) {
      console.error("Error loading cart:", error);
  }
}

  async function removeItemFromCart(productId) {
    try {
        const response = await fetch(`/api/cart/create`, { method: "DELETE", credentials: "include" });
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