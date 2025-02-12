function renderWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById('wishlist');
    wishlistContainer.innerHTML = wishlist.map(item => `
      <li>
        ${item.name} <button onclick="removeFromWishlist(${item.id})">Remove</button>
      </li>
    `).join('');
  }

  function removeFromWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlist();
  }

  renderWishlist();