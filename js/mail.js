document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("messages-container");
    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
  
    if (purchaseHistory.length === 0) {
      container.innerHTML = "<p>No purchases found.</p>";
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
      messageBox.style.background = "#f9f9f9";
  
      messageBox.innerHTML = `
        <h2>Successful Purchase</h2>
        <p>Your package will deliver in 10–12 business days!</p>
        <div class="product-container d-flex flex-wrap gap-3"></div>
        <img src="./img/bin.png" alt="Delete" class="delete-icon">
      `;
  
      const productsContainer = messageBox.querySelector(".product-container");
  
      purchase.products.forEach(product => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.style.width = "12rem";
        cardDiv.style.border = "1px solid #ddd";
        cardDiv.style.borderRadius = "8px";
        cardDiv.style.overflow = "hidden";
        cardDiv.style.textAlign = "center";
        cardDiv.style.background = "#fff";
  
        const cardImg = document.createElement("img");
        cardImg.src = `/uploads/${product.product}`;
        cardImg.alt = product.product_name;
        cardImg.style.width = "100%";
        cardImg.style.height = "auto";
  
        const cardTitle = document.createElement("h6");
        cardTitle.textContent = product.product_name;
        cardTitle.style.margin = "10px 0";
        cardTitle.style.fontSize = "1rem";
  
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