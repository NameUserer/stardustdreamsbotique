function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = cart.map(item => `
      <li>
        ${item.name} (x${item.quantity})
        <button onclick="changeQuantity(${item.id}, -1)">−</button>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </li>
    `).join('');
  }

  function changeQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  }

  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  renderCart();

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