const backbutton = document.getElementsByClassName('back')[0];

backbutton.addEventListener('click', () => {
    window.location.href = '../admin.html';
});

document.addEventListener("DOMContentLoaded", function() {
    const addProductButton = document.getElementById("addProductButton");

    if (addProductButton) {
        addProductButton.addEventListener("click", async function() {
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
            
            const formData = new FormData();
            formData.append("productImage", imageInput.files[0]);
            formData.append("product_name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("type_id", typeId);
            formData.append("category_id", categoryId);
            
            try {
                const response = await fetch("/api/products/uploadProduct", {
                    method: "POST",
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error("Failed to upload product");
                }
                
                const product = await response.json();
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