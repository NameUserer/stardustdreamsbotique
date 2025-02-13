const btnLogin = document.getElementsByClassName('login')[0];
const btnReg = document.getElementsByClassName('reg')[0];

btnLogin.addEventListener('click', () => {
    window.location.href = '../login.html';
});

btnReg.addEventListener('click', () => {
    window.location.href = '../registration.html';
});

async function getProducts() {
    const res = await fetch('https://nodejs313.dszcbaross.edu.hu/api/auth/productsController', {
        method: 'GET',
        credentials: 'include'
    });
    const products = await res.json();
    console.log(products);
    renderProducts(products);
}

function renderProducts(products) {
    const row = document.getElementById('row');
    for (const product of products) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        // --- card-header ---
        const cardHeaderDiv = document.createElement('div');
        cardHeaderDiv.classList.add('card-header');
        cardHeaderDiv.textContent = product.name;

        const cardImg = document.createElement('img');
        cardImg.src = `http://127.0.0.1:3000/uploads/${product.profile_pic}`;
        cardImg.alt = product.name;

        cardHeaderDiv.append(cardImg);
        // --- card-body ---
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');
        
        const picDiv = document.createElement('div');
        picDiv.classList.add('pic-div');
        const picDivImg = document.createElement('img');
        picDivImg.src = `http://127.0.0.1:3000/uploads/${product.product}`;
        picDivImg.alt = product.product;

        picDiv.append(picDivImg);
        cardBodyDiv.append(picDiv);

        // --- card-footer ---
        const cardFooterDiv = document.createElement('div');
        cardFooterDiv.classList.add('card-footer');

        const footerSpan = document.createElement('span');
        footerSpan.textContent = product.like;

        const likeIcon = document.createElement('i');
        if (product.alreadLiked === 0) {
            likeIcon.classList.add('fa-regular', 'fa-thumbs-up');
            likeIcon.addEventListener('click', () => wishlist(product.upload_id));
        } else {
            likeIcon.classList.add('fa-regular', 'fa-thumbs-up', 'like');
            likeIcon.addEventListener('click', () => wishlist(product.upload_id, likeIcon));
        }

        cardFooterDiv.append(footerSpan, likeIcon)

        // --- a létrehozott html elemek összefűzése ---
        cardDiv.append(cardHeaderDiv, cardBodyDiv, cardFooterDiv);

        // hozzáfűzzük minden iterációban a cardDiv-et a row-hoz
        row.append(cardDiv);
        //console.log(cardDiv);
    }
}

async function wishlist(upload_id) {
    //console.log(upload_id);
    const res = await fetch(`http:127.0.0.1:3000/api/like/${upload_id}`, {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
        getMemes();
        //likeIcon.style.backgroundColor = '#17BD3E';
    } else {
        alert(data.error);
    }
}

async function removewishlist(upload_id) {
    const res = await fetch(`http:127.0.0.1:3000/api/like/${upload_id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (res.ok) {
        getMemes();
    } else {
        const data = await res.json();
        alert(data.error);
    }
}

function addToCart(id, name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id);
    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ id, name, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function toggleWishlist(id, name) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.findIndex(item => item.id === id);
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push({ id, name });
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}