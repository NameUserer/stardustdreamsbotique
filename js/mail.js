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
        <button class="delete-btn" title="Delete">
          <img src="images/bin.png" alt="Delete" class="delete-icon">
        </button>
      `;
  
      // Add styling to product container
      const productsContainer = messageBox.querySelector(".product-container");
  
      purchase.products.forEach(product => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.style.width = "18rem";
  
        const cardImg = document.createElement("img");
        cardImg.src = `/uploads/${product.product}`;
        cardImg.classList.add("pic-div");
        cardImg.alt = product.product_name;
  
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
        cardDiv.append(cardImg, cardBodyDiv);
  
        productsContainer.appendChild(cardDiv);
      });
  
      // Delete button logic
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