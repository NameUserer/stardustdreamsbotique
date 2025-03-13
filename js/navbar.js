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

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + "; path=/" + expires;
}


document.addEventListener("DOMContentLoaded", checkLoginStatus);

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

function checkLoginStatus() {
    let user = getCookie("user");
    let accountIcon = document.querySelector(".icon img");

    if (user) {
        accountIcon.style.border = "2px solid green"; // Example visual effect
    } else {
        accountIcon.style.border = "none"; // Reset if not logged in
    }
}

function handleAccountClick() {
  let user = localStorage.getItem("user");

  if (user) {
    window.location.href = "../account.html";
  } else {
    Swal.fire({
      title: "Welcome!",
      text: "Would you like to log in or sign up?",
      imageUrl: "../img/barbara.png",
      imageWidth: 150,
      imageHeight: 350,
      imageAlt: "Custom image",
      showCancelButton: true,
      confirmButtonText: "Log In",
      cancelButtonText: "Sign Up",
      confirmButtonColor: "#362F67",
      cancelButtonColor: "#D6AEE9"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'login.html'; // Redirect to login page
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = 'registration.html'; // Redirect to sign up page
      }
    });
  }
}