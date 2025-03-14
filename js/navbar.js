const home= document.getElementsByClassName('home')[0];
const mail = document.getElementsByClassName('mail')[0];
const wl= document.getElementsByClassName('wl')[0];
const cart= document.getElementsByClassName('cart')[0];

function isLoggedIn() {
  console.log(document.cookie.split('; ').some(cookie => cookie.startsWith('auth_token=')));
  
  return document.cookie.split('; ').some(cookie => cookie.startsWith('auth_token='));
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

function handleAccountClick() {

  let isLoggedIn = document.cookie.includes("loggedIn=true");

  if (isLoggedIn) {
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