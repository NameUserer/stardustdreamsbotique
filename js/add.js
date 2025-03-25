const backbutton = document.getElementsByClassName('back')[0];

backbutton.addEventListener('click', () => {
    window.location.href = '../admin.html';
});

document.addEventListener("DOMContentLoaded", function() {
    const addProductButton = document.getElementById("addProductButton");

    if (addProductButton) {
        addProductButton.addEventListener("click", async function() {
            const product_name = document.getElementById('productName').value;
            const description = document.getElementById('productDescription').value;
            const price = document.getElementById('productPrice').value;
            const product = document.getElementById('productImage').files[0];
            const type_id = document.getElementById('typeSelect').value;
            const chategory_name = document.getElementById('categorySelect').value;
            console.log(product_name, description, price, type_id, chategory_name);
            console.log(product);         
            
            if (!product_name || !description || !price || !product) {
                alert('Please fill all fields and select an image.');
                return;
            }
            
            const formData = new FormData();
            formData.append("productImage", product);
            formData.append("product_name", product_name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("type_id", type_id);
            formData.append("category_name", chategory_name);
            console.log(formData);
            
            try {
                const response = await fetch("/api/products/uploadProduct", {
                    method: "POST",
                    body: formData,
                    credentials: 'include'
                });
                
                console.log(response);
                const product = await response.json();
                
                if (!response.ok) {
                    console.log(product.details);
                    
                    throw new Error("Failed to upload product");
                }
                
                console.log(product);
                
                alert("Product added successfully!");
            } catch (error) {
                console.error("Error:", error);
                alert("Error adding product");
            }
        });
    } else {
        console.error("Button with ID 'addProductButton' not found.");
    }
});