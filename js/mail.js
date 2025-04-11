document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("messages-container");
  
    // Load latest purchase data
    const purchaseData = JSON.parse(localStorage.getItem("purchaseData"));
  
    if (!purchaseData || !purchaseData.products || purchaseData.products.length === 0) {
      container.innerHTML = "<p>No recent purchase found.</p>";
      return;
    }
  
    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box");
  
    messageBox.innerHTML = `
      <h2>Successful Purchase</h2>
      <p>Your package will deliver in 10–12 business days!</p>
      <div class="products"></div>
      <button class="delete-btn">Delete</button>
    `;
  
    const productsContainer = messageBox.querySelector(".products");
  
    purchaseData.products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <p>${product.name}</p>
      `;
      productsContainer.appendChild(productDiv);
    });
  
    // Delete message on click
    messageBox.querySelector(".delete-btn").addEventListener("click", () => {
      messageBox.remove();
      localStorage.removeItem("purchaseData"); // optionally clear the last purchase
    });
  
    container.appendChild(messageBox);
  });