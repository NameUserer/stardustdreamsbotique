document.addEventListener("DOMContentLoaded", () => {
    console.log("mail.js loaded");
    console.log("Purchase message:", localStorage.getItem("purchaseMessage"));
    
    // Check if we have a purchase message
    const purchaseMessage = localStorage.getItem("purchaseMessage");
    
    if (purchaseMessage === "success") {
        console.log("Displaying purchase confirmation");
        displayPurchaseConfirmation();
        
        // We don't remove the purchaseMessage so multiple purchases can be displayed
    } else {
        console.log("No purchase detected, should redirect");
        // Comment this out for testing if needed
        // window.location.href = "index.html";
    }
});

// Function to display purchase confirmation
function displayPurchaseConfirmation() {
    // Get the main container
    let mainContainer = document.querySelector(".main-container");
    
    if (!mainContainer) {
        console.error("Main container not found. Creating one.");
        const newContainer = document.createElement("div");
        newContainer.className = "main-container";
        document.body.appendChild(newContainer);
        mainContainer = newContainer;
    }
    
    // Get all purchase data from localStorage
    let purchaseData;
    try {
        purchaseData = JSON.parse(localStorage.getItem("purchaseData")) || {
            products: [],
            customer: {},
            totalAmount: 0
        };
        console.log("Purchase data loaded:", purchaseData);
    } catch (e) {
        console.error("Error parsing purchase data:", e);
        purchaseData = {
            products: [],
            customer: {},
            totalAmount: 0
        };
    }
    
    // Create confirmation container
    const confirmationContainer = document.createElement("div");
    confirmationContainer.className = "confirmation-container";
    
    // Create and add confirmation message
    const messageHeader = document.createElement("h2");
    messageHeader.className = "confirmation-header";
    messageHeader.textContent = "Sikeres vásárlás!";
    
    const messageText = document.createElement("p");
    messageText.className = "confirmation-message";
    messageText.textContent = "Köszönjük, hogy nálunk vásároltál! A csomagod 10-12 munkanapon belül megérkezik.";
    
    // Add header and message to container
    confirmationContainer.appendChild(messageHeader);
    confirmationContainer.appendChild(messageText);
    
    // Create products container
    const productsContainer = document.createElement("div");
    productsContainer.className = "products-container";
    
    // Add product cards
    if (purchaseData.products && purchaseData.products.length > 0) {
        purchaseData.products.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
    } else {
        console.warn("No products found in purchase data");
        
        // Use some sample data for testing - THIS IS JUST FOR FALLBACK
        const sampleProducts = [
            { product_name: "Teszt termék 1", productIMG: "images/product1.jpg", quantity: 1, price: 5900 },
            { product_name: "Teszt termék 2", productIMG: "images/product2.jpg", quantity: 2, price: 3500 }
        ];
        
        sampleProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
    }
    
    // Add products container to main container
    confirmationContainer.appendChild(productsContainer);
    
    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Törlés";
    deleteButton.addEventListener("click", () => {
        // Remove this confirmation container
        mainContainer.removeChild(confirmationContainer);
        
        // Clear the purchase data
        localStorage.removeItem("purchaseData");
        localStorage.removeItem("purchaseMessage");
    });
    
    confirmationContainer.appendChild(deleteButton);
    
    // Add the entire confirmation container to the page
    mainContainer.appendChild(confirmationContainer);
    console.log("Confirmation display complete");
}

// Function to create a product card
function createProductCard(product) {
    console.log("Creating product card for:", product);
    
    const card = document.createElement("div");
    card.className = "product-card";
    
    // Product image - use productIMG instead of imageUrl
    const productImage = document.createElement("img");
    productImage.src = product.productIMG || product.imageUrl || "images/placeholder.jpg";
    productImage.alt = product.product_name || product.name;
    productImage.className = "product-image";
    
    // Product name - use product_name instead of name
    const productName = document.createElement("p");
    productName.textContent = product.product_name || product.name;
    productName.className = "product-name";
    
    // Add all elements to card
    card.appendChild(productImage);
    card.appendChild(productName);
    
    return card;
}