document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("messages-container");
    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
  
    if (purchaseHistory.length === 0) {
      container.innerHTML = "<p>No messages found.</p>";
      return;
    }
  
    purchaseHistory.forEach((purchase, index) => {
      const messageBox = document.createElement("div");
      messageBox.classList.add("message-box");
      messageBox.style.position = "relative";
      messageBox.style.border = "1px solid #ccc";
      messageBox.style.borderRadius = "10px";
      messageBox.style.padding = "20px";
      messageBox.style.marginBottom = "30px";
  
      messageBox.innerHTML = `
        <h2>Successful Purchase</h2>
        <p>Your package will deliver in 10–12 business days!</p>
        <div class="product-container d-flex flex-wrap gap-3"></div>
        <button class="delete-btn" title="Delete">
          <img src="./img/bin.png" alt="Delete" class="delete-icon">
        </button>
      `;
  
      const productsContainer = messageBox.querySelector(".product-container");
  
      purchase.products.forEach(product => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.style.width = "12rem";
        cardDiv.style.border = "1px solid #ddd";
        cardDiv.style.borderRadius = "8px";
        cardDiv.style.overflow = "hidden";
  
        const cardImg = document.createElement("img");
        cardImg.src = product.imageUrl || ""; // Safe fallback
        cardImg.alt = product.name;

        const cardTitle = document.createElement("h6");
        cardTitle.textContent = product.name;
  
        cardDiv.append(cardImg, cardTitle);
        productsContainer.appendChild(cardDiv);
      });
  
      messageBox.querySelector(".delete-btn").addEventListener("click", () => {
        purchaseHistory.splice(index, 1);
        localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
        messageBox.remove();
  
        if (purchaseHistory.length === 0) {
          container.innerHTML = "<p>No purchases found.</p>";
        }
      });
  
      container.appendChild(messageBox);
    });
  });