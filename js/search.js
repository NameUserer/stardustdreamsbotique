const button = document.querySelectorAll('button')[0];
const results = document.getElementById('results');

button.addEventListener('click', searchProducts);

async function searchProducts() {
    const search = document.getElementById('search').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const response = await fetch(`/products/${search}`);

    const products = await response.json();

    if (products.length === 0) {
        const noProductsMessage = document.createElement('p');
        noProductsMessage.textContent = 'A termék nem található.';
        resultsDiv.appendChild(noProductsMessage);
    } else {
        products.forEach(product => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
            cardDiv.style.width = "18rem";
    
    // Card Image
    const cardImg = document.createElement("img");
    cardImg.src = `/uploads/${product.product}`;
    cardImg.classList.add("pic-div");
    cardImg.alt = product.product_name;
    
    // Card Body
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
    
    // Card Footer
    const cardFooterDiv = document.createElement("div");
    cardFooterDiv.classList.add("card-footer", "d-flex", "justify-content-between");
    
    // Buy Button
    const buyButton = document.createElement("a");
    buyButton.href = "#";
    buyButton.classList.add("btn", "cart");
    buyButton.textContent = "Buy";
    buyButton.addEventListener("click", () => addToCart(product));

    // Wishlist Button
    const wishlistButton = document.createElement("a");
    wishlistButton.href = "#";
    wishlistButton.classList.add("btn", "wishlist");
    wishlistButton.textContent = "♥";
    wishlistButton.addEventListener("click", () => addToWishlist(product));

    cardFooterDiv.append(buyButton, wishlistButton);
    
    // Append elements
    cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
    document.getElementById("row").append(cardDiv);
        });
    }
}