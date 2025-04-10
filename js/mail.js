document.addEventListener("DOMContentLoaded", () => {
    // Check if we have a purchase message and purchase data
    const purchaseMessage = localStorage.getItem("purchaseMessage");
    
    if (purchaseMessage === "success") {
        displayPurchaseConfirmation();
        
        // Clear the purchase message flag so it doesn't show again on refresh
        localStorage.removeItem("purchaseMessage");
    } else {
        // If no purchase was made, redirect to the homepage
        window.location.href = "index.html";
    }
});

// Function to display purchase confirmation
function displayPurchaseConfirmation() {
    // Get the main container
    const mainContainer = document.querySelector(".main-container") || document.body;
    
    // Create confirmation container
    const confirmationContainer = document.createElement("div");
    confirmationContainer.className = "confirmation-container";
    
    // Get purchase data from localStorage
    const purchaseData = JSON.parse(localStorage.getItem("purchaseData")) || {
        products: [],
        customer: {},
        totalAmount: 0
    };
    
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
        const noProductsMsg = document.createElement("p");
        noProductsMsg.textContent = "Nincs megjelenítendő termék.";
        productsContainer.appendChild(noProductsMsg);
    }
    
    // Add products container to main container
    confirmationContainer.appendChild(productsContainer);
    
    // Add return to shop button
    const returnButton = document.createElement("button");
    returnButton.className = "return-button";
    returnButton.textContent = "Vissza a boltba";
    returnButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
    
    confirmationContainer.appendChild(returnButton);
    
    // Add the entire confirmation container to the page
    mainContainer.appendChild(confirmationContainer);
    
    // Add styles
    addStyles();
}

// Function to create a product card
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    
    // Product image
    const productImage = document.createElement("img");
    productImage.src = product.product || "placeholder.jpg";
    productImage.alt = product.product_name;
    productImage.className = "product-image";
    
    // Product name
    const productName = document.createElement("p");
    productName.textContent = product.product_name;
    productName.className = "product-name";
    
    // Product quantity and price
    const productDetails = document.createElement("p");
    productDetails.className = "product-details";
    productDetails.textContent = `${product.quantity} db × ${formatPrice(product.price)} Ft`;
    
    // Add all elements to card
    card.appendChild(productImage);
    card.appendChild(productName);
    card.appendChild(productDetails);
    
    return card;
}

// Format price with thousand separators
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}