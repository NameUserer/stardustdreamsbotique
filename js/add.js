const backbutton = document.getElementsByClassName('back')[0];

backbutton.addEventListener('click', () => {
    window.location.href = '../admin.html';
});

function addProduct() {
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const imageInput = document.getElementById('productImage');
    
    if (!name || !description || !price || !imageInput.files.length) {
        alert('Please fill all fields and select an image.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <img src="${event.target.result}" alt="${name}">
            <h3>${name}</h3>
            <p>${description}</p>
            <p><strong>$${price}</strong></p>
        `;
        document.getElementById('productList').appendChild(productCard);
    };
    reader.readAsDataURL(imageInput.files[0]);
}