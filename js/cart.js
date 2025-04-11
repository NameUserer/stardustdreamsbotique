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
          console.log(product.product_id);
          console.log(product);
          
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
                // Update UI immediately
                product.quantity--;
                quantitySpan.textContent = product.quantity;
                
                // Then update the server
                const success = await updateCartQuantity(product.product_id, product.quantity);
                
                // If server update failed, revert the UI
                if (!success) {
                  // product.quantity++;
                  // quantitySpan.textContent = product.quantity;
                  location.reload(true);
                }
            }
          });
  
          const quantitySpan = document.createElement("span");
          quantitySpan.textContent = product.quantity || 1;
          quantitySpan.classList.add("mx-2");
  
          const plusButton = document.createElement("button");
          plusButton.textContent = "+";
          plusButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
          plusButton.addEventListener("click", async () => {
              // Update UI immediately
              product.quantity++;
              quantitySpan.textContent = product.quantity;
              
              // Then update the server
              const success = await updateCartQuantity(product.product_id, product.quantity);
              
              // If server update failed, revert the UI
              if (!success) {
                // product.quantity--;
                // quantitySpan.textContent = product.quantity;
                location.reload(true);
              }
          });
  
          quantityDiv.append(minusButton, quantitySpan, plusButton);
  
          // Remove Button
          const removeButton = document.createElement("button");
          removeButton.textContent = "Remove";
          removeButton.classList.add("btn", "btn-danger", "btn-sm");
          removeButton.addEventListener("click", async () => {
            console.log('Removing item with cart_item_id:', product.product_id);  
            const success = await removeItemFromCart(product.product_id);
            if (success) {
              cardDiv.remove();
              // Check if cart is empty after removal
              if (cartContainer.children.length === 0) {
                cartContainer.innerHTML = "<p>Your cart is empty.</p>";
              }
            }
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
    console.log(`updataCartQuantity: ${product_id}, ${quantity}`);
    
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
            return true;
        } else {
            console.log('Failed to update cart quantity.');
            return false;
        }
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        return false;
    }
  }
  
  // Function to remove the item from the cart (backend integration)
  async function removeItemFromCart(product_id) {
    try {
      const response = await fetch(`/api/cart/deleteCartItem/${product_id}`, {
        method: 'DELETE'
      });
      console.log('/api/cart/deleteCartItem/${product_id} eredménye:');
      console.log(response);
    
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove item from cart');
      }
      
      return 'success';
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
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
      Swal.fire({
          title: 'Checkout Information',
          html:
              `<input type="email" id="email" class="swal2-input" placeholder="Email">
               <input type="text" id="card_token" class="swal2-input" placeholder="Credit Card Number">
               <input type="text" id="address" class="swal2-input" placeholder="Shipping Address">`,
          confirmButtonText: 'Buy Now',
          focusConfirm: false,
          preConfirm: () => {
              const email = document.getElementById('email').value.trim();
              const card_token = document.getElementById('card_token').value.trim();
              const shipping_address = document.getElementById('address').value.trim();

              if (!email || !card_token || !shipping_address) {
                  Swal.showValidationMessage('Please fill out all fields');
                  return false;
              }

              return { email, card_token, shipping_address };
          }
      }).then((result) => {
          if (result.isConfirmed) {
              // Save customer details for mail.html page
              const customerInfo = {
                  email: result.value.email,
                  address: result.value.shipping_address
              };
              
              // Get cart items to save for the confirmation page
              const cartItems = getCartItems();
              
              fetch("/api/checkout", {
                  method: "POST",
                  credentials: "include",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(result.value)
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
                  // Save purchase data to localStorage for the mail.html page
                  savePurchaseData(cartItems, customerInfo);

                  Swal.fire({
                      icon: "success",
                      title: "Sikeres vásárlás!",
                      text: "Köszönjük a vásárlást!",
                      confirmButtonText: "OK"
                  }).then(() => {
                      localStorage.setItem("purchaseMessage", "success");
                      window.location.href = "mail.html";
                  });
              })
              .catch(error => {
                  console.error("Hiba a vásárlás során:", error);
                  Swal.fire("Hiba!", "Valami hiba történt a vásárlás során.", "error");
              });
          }
      });
  });
});
  
  // Function to get all items from the cart
  function getCartItems() {
    const items = []; // Create a local variable to store cart items
    const cartItemElements = document.querySelectorAll(".cart-item");
    
    console.log("Found cart items:", cartItemElements.length);
    
    cartItemElements.forEach(item => {
        // Get product name
        const productName = item.querySelector(".cart-item-title")?.textContent || "Product";
        
        // Get product image URL
        const productImage = item.querySelector(".cart-item-image")?.src || "";
        
        // Get product price
        const priceText = item.querySelector(".cart-item-price")?.textContent || "";
        const price = parseFloat(priceText.replace(/[^\d]/g, "")) || 0;
        
        // Get quantity
        const quantityInput = item.querySelector(".quantity-input");
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        
        items.push({
            name: productName,
            imageUrl: productImage,
            price: price,
            quantity: quantity
        });
    });
    
    console.log("Cart items found:", items);
    return items; // Return the local variable
}