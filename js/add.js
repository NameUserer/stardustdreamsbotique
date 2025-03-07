const backbutton = document.getElementsByClassName('back')[0];

backbutton.addEventListener('click', () => {
    window.location.href = '../admin.html';
});

function addProduct() {
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const imageInput = document.getElementById('productImage');
    const typeId = document.getElementById('typeSelect').value;
    const categoryId = document.getElementById('categorySelect').value;
    
    if (!name || !description || !price || !imageInput.files.length) {
        alert('Please fill all fields and select an image.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const product = {
            product: event.target.result,
            product_name: name,
            description: description,
            price: price,
            type_id: typeId,
            category_id: categoryId
        };
        
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.style.width = "18rem";
        
        const cardImg = document.createElement("img");
        cardImg.src = product.product;
        cardImg.classList.add("card-img-top");
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
        
        const typeText = document.createElement("p");
        typeText.textContent = `Type ID: ${product.type_id}`;
        
        const categoryText = document.createElement("p");
        categoryText.textContent = `Category ID: ${product.category_id}`;
        
        cardBodyDiv.append(cardTitle, cardText, priceText, typeText, categoryText);
        
        const cardFooterDiv = document.createElement("div");
        cardFooterDiv.classList.add("card-footer", "d-flex", "justify-content-between");
        
        const buyButton = document.createElement("a");
        buyButton.href = "#";
        buyButton.classList.add("btn", "cart");
        buyButton.textContent = "Buy";
        buyButton.addEventListener("click", () => addToCart(product));
        
        const wishlistButton = document.createElement("a");
        wishlistButton.href = "#";
        wishlistButton.classList.add("btn", "wishlist");
        wishlistButton.textContent = "♥";
        wishlistButton.addEventListener("click", () => addToWishlist(product));
        
        cardFooterDiv.append(buyButton, wishlistButton);
        cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
        document.getElementById("row").append(cardDiv);
    };
    reader.readAsDataURL(imageInput.files[0]);
}