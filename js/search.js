const button = document.querySelectorAll('button')[0];
const results = document.getElementById('results');

button.addEventListener('click', searchProducts);

async function searchProducts() {
    const search = document.getElementById('search').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const response = await fetch(`http://localhost:3000/products/${search}`);

    const products = await response.json();

    if (products.length === 0) {
        const noProductsMessage = document.createElement('p');
        noProductsMessage.textContent = 'A termék nem található.';
        resultsDiv.appendChild(noProductsMessage);
    } else {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const productName = document.createElement('h2');
            productName.textContent = product.name;
            productDiv.appendChild(productName);

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;
            productDiv.appendChild(productDescription);

            const productPrice = document.createElement('p');
            const strongElement = document.createElement('strong');
            strongElement.textContent = 'Price: ';
            productPrice.appendChild(strongElement);
            productPrice.appendChild(document.createTextNode(`$${product.price}`));
            productDiv.appendChild(productPrice);

            resultsDiv.appendChild(productDiv);
        });
    }
}