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
      messageBox.style.backgroundColor = "#ffffff";
      
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