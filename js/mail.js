document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("messages-container");
    
    // For debugging - let's check what's in localStorage
    console.log("Purchase History:", JSON.parse(localStorage.getItem("purchaseHistory") || "[]"));
    
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
      messageBox.style.backgroundColor = "#f9f9f9";
      
      // Format purchase date if available
      let dateString = "";
      if (purchase.purchaseDate) {
        try {
          const date = new Date(purchase.purchaseDate);
          dateString = date.toLocaleDateString();
        } catch (e) {
          console.error("Error formatting date:", e);
        }
      }
  
      // Format total amount if available
      let totalString = "";
      if (purchase.totalAmount !== undefined) {
        totalString = `<p><strong>Total:</strong> $${purchase.totalAmount.toFixed(2)}</p>`;
      }
  
      messageBox.innerHTML = `
        <h2>Successful Purchase${dateString ? ` (${dateString})` : ''}</h2>
        <p>Your package will deliver in 10–12 business days!</p>
        ${totalString}
        <div class="product-container d-flex flex-wrap gap-3" style="margin-top: 15px;"></div>
        <button class="delete-btn" title="Delete" style="position: absolute; top: 10px; right: 10px; background: none; border: none; cursor: pointer;">
          <img src="./img/bin.png" alt="Delete" class="delete-icon" style="width: 20px; height: 20px;">
        </button>
      `;
  
      const productsContainer = messageBox.querySelector(".product-container");
      
      // Check if products exist and is an array
      if (!purchase.products || !Array.isArray(purchase.products) || purchase.products.length === 0) {
        productsContainer.innerHTML = "<p>No product details available</p>";
      } else {
        purchase.products.forEach(product => {
          console.log("Processing product:", product); // Debug log
          
          const cardDiv = document.createElement("div");
          cardDiv.classList.add("card");
          cardDiv.style.width = "12rem";
          cardDiv.style.border = "1px solid #ddd";
          cardDiv.style.borderRadius = "8px";
          cardDiv.style.overflow = "hidden";
          cardDiv.style.marginBottom = "10px";
          cardDiv.style.backgroundColor = "#fff";
  
          const cardImg = document.createElement("img");
          // Check if image path is valid and exists
          const imagePath = product.imageUrl || "";
          cardImg.onerror = () => {
            cardImg.src = "./img/placeholder.png"; // Fallback if image doesn't load
            console.log("Image failed to load:", imagePath);
          };
          cardImg.src = imagePath;
          cardImg.alt = product.name || "Product";
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
          cardTitle.textContent = product.name || "Product";
  
          cardBody.appendChild(cardTitle);
  
          // Add price if available
          if (product.price) {
            const priceText = document.createElement("p");
            priceText.classList.add("card-text");
            priceText.style.margin = "5px 0 0 0";
            priceText.style.fontSize = "12px";
            priceText.textContent = `$${product.price.toFixed(2)}`;
            
            // Add quantity if available
            if (product.quantity && product.quantity > 1) {
              priceText.textContent += ` × ${product.quantity}`;
            }
            
            cardBody.appendChild(priceText);
          }
  
          cardDiv.appendChild(cardImg);
          cardDiv.appendChild(cardBody);
          productsContainer.appendChild(cardDiv);
        });
      }
  
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