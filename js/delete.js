const backbutton = document.getElementsByClassName('back')[0];

backbutton.addEventListener('click', () => {
    window.location.href = '../admin.html';
});

function renderProducts(products) {
    console.log(`renderProducts: ${products}`);
    const row = document.getElementById("row");
    row.innerHTML = "";
  
    for (const product of products) {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.style.width = "18rem";
      
      // Card Image
      const cardImg = document.createElement("img");
      cardImg.src = `/uploads/${product.product}`;
      cardImg.classList.add("card-img-top");
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
  
      const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "delete-btn");
    deleteButton.textContent = "🗑 Delete";
    deleteButton.style.backgroundColor = "#e74c3c";
    deleteButton.style.color = "white";
    deleteButton.style.border = "none";
    deleteButton.style.padding = "5px 10px";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.borderRadius = "5px";

    deleteButton.addEventListener("click", () => deleteProduct(product.product_id));

    cardFooterDiv.append(buyButton, wishlistButton, deleteButton);

    // Append elements
    cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
    row.append(cardDiv);
    }
  }

  function deleteProduct(productId) {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulate backend request (Replace with actual API call)
        fetch(`/api/deleteProduct/${productId}`, { method: "DELETE" })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              Swal.fire("Deleted!", "Your product has been deleted.", "success");
              // Refresh products (replace with actual API call to fetch updated list)
              fetchProducts();
            } else {
              Swal.fire("Error!", "Product could not be deleted.", "error");
            }
          })
          .catch(error => console.error("Error deleting product:", error));
      }
    });
  }

// Search function to filter products by name
function fetchProducts() {
    fetch("/api/products")
      .then(response => response.json())
      .then(products => renderProducts(products))
      .catch(error => console.error("Error fetching products:", error));
  }
  
  // Initial fetch
  fetchProducts();