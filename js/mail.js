document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("messages-container");
  
    let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
  
    if (purchaseHistory.length === 0) {
      container.innerHTML = "<p>No purchases found.</p>";
      return;
    }
  
    purchaseHistory.forEach((purchase, index) => {
      const messageBox = document.createElement("div");
      messageBox.classList.add("message-box");
  
      messageBox.innerHTML = `
        <h2>Successful Purchase</h2>
        <p>Your package will deliver in 10–12 business days!</p>
        <div class="products"></div>
        <button class="delete-btn">Delete</button>
      `;
  
      const productsContainer = messageBox.querySelector(".products");
  
      purchase.products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}">
          <p>${product.name}</p>
        `;
        productsContainer.appendChild(productDiv);
      });
  
      // Delete individual purchase message
      messageBox.querySelector(".delete-btn").addEventListener("click", () => {
        purchaseHistory.splice(index, 1); // remove this item
        localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
        messageBox.remove();
  
        if (purchaseHistory.length === 0) {
          container.innerHTML = "<p>No purchases found.</p>";
        }
      });
  
      container.appendChild(messageBox);
    });
  });