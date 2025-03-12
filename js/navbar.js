const home= document.getElementsByClassName('home')[0];
const mail = document.getElementsByClassName('mail')[0];
const wl= document.getElementsByClassName('wl')[0];
const cart= document.getElementsByClassName('cart')[0];

function isLoggedIn() {
    return document.cookie.includes("loggedIn=true");
}

// Function to handle restricted navigation
function restrictedNav(page) {
    if (isLoggedIn()) {
        window.location.href = `../${page}.html`;
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Access Denied',
            text: 'You need to log in for this function to be available!',
        });
    }
}

// Event Listeners
mail.addEventListener('click', () => restrictedNav('mail'));
wl.addEventListener('click', () => restrictedNav('wishlist'));
cart.addEventListener('click', () => restrictedNav('cart'));

// Home is always accessible
home.addEventListener('click', () => {
    window.location.href = '../home.html';
});