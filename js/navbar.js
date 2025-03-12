const home= document.getElementsByClassName('home')[0];
const mail = document.getElementsByClassName('mail')[0];
const wl= document.getElementsByClassName('wl')[0];
const cart= document.getElementsByClassName('cart')[0];

home.addEventListener('click', () => {
    window.location.href = '../home.html';
});

mail.addEventListener('click', () => {
    window.location.href = '../mail.html';
});

wl.addEventListener('click', () => {
    window.location.href = '../wishlist.html';
});

cart.addEventListener('click', () => {
    window.location.href = '../cart.html';
});