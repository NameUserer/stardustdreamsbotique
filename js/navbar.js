const home = document.getElementsByClassName('home')[0];
const mail = document.getElementsByClassName('mail')[0];
const wl = document.getElementsByClassName('wl')[0];
const cart = document.getElementsByClassName('cart')[0];

async function isLoggedIn() {
  const response = await fetch('/api/auth/isLoggedIn', { credentials: 'include' });
  const data = await response.json();
  console.log(data)
  return data.loggedIn;
}

// Function to handle restricted navigation
async function restrictedNav(page) {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
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

async function handleAccountClick() {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    window.location.href = "../profile.html";
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

window.addEventListener("DOMContentLoaded", () => {
  const accountIcon = document.getElementById("accountIcon");

  // Make sure user is logged in (you could also use a cookie or another flag)
  const isLoggedIn = true; // Replace this with your actual login check

  if (isLoggedIn) {
      fetch("/api/profile/pic") // Your backend endpoint
          .then(response => response.json())
          .then(data => {
              if (data && data.profilePicUrl) {
                  accountIcon.src = data.profilePicUrl;
              }
          })
          .catch(err => {
              console.error("Failed to load profile pic:", err);
          });
  }
});