const addbutton = document.getElementsByClassName('add')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];

iconLogout.addEventListener('click', logout);

addbutton.addEventListener('click', () => {
    window.location.href = '../add.html';
});

// Fetch and display all products on page load
window.onload = async () => {
    try {
      const products = await getProducts();
      displayResults(products);
    } catch (error) {
      console.error("Error on window load:", error);
    }
  };

  // Fetch all or filtered products
async function getProducts(queryParams = "") {
    let url = `/api/products/getALLproduct`;
  
    if (queryParams) {
      url += `?${queryParams}`;
    }
  
    console.log("Fetching from:", url);
  
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include"
      });
      console.log(response);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }
  
      const products = await response.json();
      console.log("Fetched products:", products);
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
  
  // Display results in the UI
  function displayResults(products) {
    console.log("Displaying products:", products);
    renderProducts(products);
  }
  
  // Render product cards
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
    cardFooterDiv.classList.add("card-footer", "d-flex", "justify-content-center");
    
    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteProduct(product.product_id));

    cardFooterDiv.append(deleteButton);
      
      // Append elements
      cardDiv.append(cardImg, cardBodyDiv, cardFooterDiv);
      document.getElementById("row").append(cardDiv);
    }
  }

  async function logout() {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();

    if (res.ok) {
        Swal.fire({
            title: 'Successfull logged out!',
            text: data.message,
            imageUrl: './img/ganyu.webp',
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: 'Go'
        }).then(() => {
            window.location.href = '../home.html';
        });
    } else {
        Swal.fire({
            title: 'Error, cannot log out!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

async function deleteProduct(productId) {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });
  
    if (!confirmDelete.isConfirmed) {
      return; // User canceled deletion
    }
  
    try {
      const response = await fetch(`/api/products/delete/${productId}`, {
        method: "DELETE",
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete product. Status: ${response.status}`);
      }
  
      Swal.fire({
        title: "Deleted!",
        text: "The product has been removed.",
        icon: "success",
        confirmButtonColor: "#3085d6"
      }).then(() => {
        location.reload(); // Refresh the page to update the product list
      });
  
    } catch (error) {
      console.error("Error deleting product:", error);
  
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the product.",
        icon: "error",
        confirmButtonColor: "#d33"
      });
    }
  }