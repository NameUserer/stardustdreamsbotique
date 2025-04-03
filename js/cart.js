document.addEventListener("DOMContentLoaded", async function () {
  await loadCartItems();
});

// Function to load cart items from the database
async function loadCartItems() {
  const cartContainer = document.getElementById("cart-items");

  try {
      const response = await fetch("/api/cart/check-cart", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch cart");

      const cart = await response.json();

      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
          return;
      }

      cart.forEach((product) => {
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

        // Quantity Controls
        const quantityDiv = document.createElement("div");
        quantityDiv.classList.add("d-flex", "align-items-center");

        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
        minusButton.addEventListener("click", async () => {
          if (product.quantity > 1) {
              product.quantity--;
              quantitySpan.textContent = product.quantity;
              await updateCartQuantity(product.product_id, product.quantity);
          }
        });

        const quantitySpan = document.createElement("span");
        quantitySpan.textContent = product.quantity || 1;
        quantitySpan.classList.add("mx-2");

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
        plusButton.addEventListener("click", async () => {
            product.quantity++;
            quantitySpan.textContent = product.quantity;
            await updateCartQuantity(product.product_id, product.quantity);
        });

        quantityDiv.append(minusButton, quantitySpan, plusButton);

        // Remove Button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("btn", "btn-danger", "btn-sm");
        removeButton.addEventListener("click", async () => {
            await removeFromCart(product.product_id);
            cardDiv.remove();  // Remove the card from the UI
        });

        cardFooterDiv.append(quantityDiv, removeButton);

        // Assemble Card
        cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
        cartContainer.appendChild(cardDiv);
      });

  } catch (error) {
    console.error("Error loading cart:", error);
  }
}

  async function removeItemFromCart(cart_item_id) {
    try {
        const response = await fetch(`/api/cart/remove/${cart_item_id}`, { method: "DELETE", credentials: "include" });
        if (!response.ok) throw new Error("Failed to remove item");
  
        // Reload cart after successful removal
        await loadCartItems();
    } catch (error) {
        console.error("Error removing from cart:", error);
    }
  }


  document.addEventListener("DOMContentLoaded", function () {
    //updateCartSummary();
});

async function updateCartQuantity(product_id, quantity) {
  try {
      const response = await fetch('/api/cart/update-quantity', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              product_id: product_id,
              quantity: quantity
          })
      });

      if (!response.ok) throw new Error('Failed to update cart quantity');

      const result = await response.json();
      if (result.success) {
          console.log('Cart quantity updated.');
      } else {
          console.log('Failed to update cart quantity.');
      }
  } catch (error) {
      console.error('Error updating cart quantity:', error);
  }
}

// Function to remove the item from the cart (backend integration)
async function removeFromCart(productId) {
  try {
      const response = await fetch('/api/cart/remove-item', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: productId })
      });

      if (!response.ok) throw new Error('Failed to remove item from cart');

      const result = await response.json();
      if (result.success) {
          console.log('Item removed from cart.');
      } else {
          console.log('Failed to remove item from cart.');
      }
  } catch (error) {
      console.error('Error removing item from cart:', error);
  }
}