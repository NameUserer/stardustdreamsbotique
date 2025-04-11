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
        <button class="delete-btn" title="Delete" style="position: absolute; top: 10px; right: 10px; background: none; border: none; cursor: pointer;">
          <img src="./img/bin.png" alt="Delete" class="delete-icon" style="width: 20px; height: 20px;">
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
        cardDiv.style.marginBottom = "10px";
  
        const cardImg = document.createElement("img");
        cardImg.src = product.imageUrl || "./img/placeholder.png"; // Added placeholder fallback
        cardImg.alt = product.name;
        cardImg.classList.add("card-img-top");
        cardImg.style.width = "100%";
        cardImg.style.height = "120px";
        cardImg.style.objectFit = "cover";
  
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.style.padding = "10px";
  
        const cardTitle = document.createElement("h6");
        cardTitle.classList.add("card-title");
        cardTitle.style.margin = "0";
        cardTitle.style.fontSize = "14px";
        cardTitle.textContent = product.name;
  
        // Add price if available
        if (product.price) {
          const priceText = document.createElement("p");
          priceText.classList.add("card-text");
          priceText.style.margin = "5px 0 0 0";
          priceText.style.fontSize = "12px";
          priceText.textContent = `$${product.price.toFixed(2)}`;
          cardBody.appendChild(priceText);
        }
  
        cardBody.appendChild(cardTitle);
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardBody);
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