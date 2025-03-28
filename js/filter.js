const filterDropdown = document.getElementById("filterDropdown");
const filterIcon = filterDropdown.querySelector(".filter-icon");
const dropdownContent = filterDropdown.querySelector(".dropdown-content");
const resultsDiv = document.getElementById("results");
const filterButton = document.getElementById("filter");

if (filterIcon) {
  filterIcon.addEventListener("click", () => {
    filterDropdown.classList.toggle("open");
  });
}

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (filterDropdown && !filterDropdown.contains(e.target) && !e.target.matches(".dropdown-content input")) {
    filterDropdown.classList.remove("open");
  }
});

filterButton.addEventListener("click", applyFilters);

// Apply filters
async function applyFilters() {
    const selectedChategories = Array.from(document.querySelectorAll(".filter-section:nth-child(1) .filter:checked"))
        .map(checkbox => checkbox.value);
    
    const selectedTypes = Array.from(document.querySelectorAll(".filter-section:nth-child(2) .filter:checked"))
        .map(checkbox => checkbox.value);
    
    let url = "/api/products/filter";
    const params = [];
    if (selectedChategories.length) params.push(`chategory_id=${selectedChategories.join(',')}`);
    if (selectedTypes.length) params.push(`type_id=${selectedTypes.join(',')}`);
    if (params.length) url += `?${params.join('&')}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const products = await response.json();
        console.log(products);

        if (!Array.isArray(products) || products.length === 0) {
            alert("A termék nem található!");
        } else {
            document.getElementById("row").innerHTML = "";
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
    } catch (error) {
        console.error("Hiba történt:", error);
    }
}
