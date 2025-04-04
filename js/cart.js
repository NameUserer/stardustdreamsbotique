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
        console.log(product.product_id );
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
          console.log('Removing item with cart_item_id:', product.product_id );  
          await removeFromCart(product.product_id );
            cardDiv.remove();
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
async function removeFromCart(product_id) {
  try {
      const response = await fetch(`/api/cart/remove/${product_id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to remove item from cart');
      }

      const result = await response.json();
      if (result.success) {
          console.log('Item successfully removed from cart');
      } else {
          console.log('Failed to remove item from cart:', result.error);
      }
  } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Error removing item from cart. Please try again.');
  }
}


//checkout

document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/cart/check-cart', {
      method: 'GET',
      credentials: 'include' // Ha sütiket használsz az autentikációhoz
  })
  .then(response => response.json())
  .then(data => {
      let totalItems = 0;
      let totalPrice = 0;

      if (data.length > 0) {
          data.forEach(item => {
              totalItems += item.quantity;
              totalPrice += parseFloat(item.total_price) || 0;
          });
      }

      document.getElementById("items").innerText = totalItems;
      document.getElementById("price").innerText = `$${totalPrice.toFixed(2)}`;
  })
  .catch(error => console.error("Hiba a kosár betöltésekor:", error));
});

//buy

document.addEventListener("DOMContentLoaded", () => {
  const buyButton = document.querySelector(".submit-btn");

  buyButton.addEventListener("click", () => {
      fetch("/api/checkout", {
          method: "POST",
          credentials: "include", // Ha autentikációt használsz
      })
      .then(response => response.json())
      .then(data => {
          if (data.error) {
              Swal.fire({
                  icon: "error",
                  title: "Hiba!",
                  text: data.error,
                  confirmButtonText: "OK"
              });
              return;
          }

          // SweetAlert sikeres vásárlás üzenet
          Swal.fire({
              icon: "success",
              title: "Sikeres vásárlás!",
              text: "Köszönjük a vásárlást!",
              confirmButtonText: "OK"
          }).then(() => {
              // Üzenet megjelenítése a mail.html oldalon
              localStorage.setItem("purchaseMessage", `Sikeresen megvásároltad! A termék(ek): ${data.products}`);
              window.location.href = "mail.html"; // Átirányítás a mail.html-re
          });
      })
      .catch(error => console.error("Hiba a vásárlás során:", error));
  });
});