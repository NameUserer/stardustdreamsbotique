document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
});

// Check if user is logged in
function checkLoginStatus() {
    let user = localStorage.getItem("user");
    let accountIcon = document.getElementById("account");

    if (user) {
        // Show profile picture
        let userData = JSON.parse(user);
        accountIcon.innerHTML = `<img src="${userData.profilePic}" class="profile-img" alt="Profile">`;
    }
}

// Handle Account Click
function handleAccountClick() {
    let user = localStorage.getItem("user");

    if (user) {
        Swal.fire({
            title: "You're Logged In",
            text: "Do you want to log out?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Log Out",
            cancelButtonText: "Close"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("user");
                checkLoginStatus();
                Swal.fire("Logged Out!", "You have been logged out.", "success");
            }
        });
    } else {
        // Ask if they want to Log In or Sign Up
        Swal.fire({
            title: "Welcome!",
            text: "Would you like to log in or sign up?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Log In",
            cancelButtonText: "Sign Up",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#28a745"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'login.html'; // Redirect to login page
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                window.location.href = 'signup.html'; // Redirect to sign up page
            }
        });
    }
}

// Prevent access if not logged in, or direct to the right page if logged in
function requireLogin(targetPage) {
    let user = localStorage.getItem("user");

    if (!user) {
        Swal.fire({
            title: "Access Denied",
            text: "Please log in or sign up first.",
            icon: "warning",
            confirmButtonText: "OK"
        });
    } else {
        // Redirect to the correct page if logged in
        window.location.href = targetPage;
    }
}

// Simulate Login
function loginUser() {
    let dummyUser = {
        name: "John Doe",
        profilePic: "https://i.pravatar.cc/150?img=3"
    };

    localStorage.setItem("user", JSON.stringify(dummyUser));
    checkLoginStatus();
    window.location.href = getRedirectPage(); // Redirect to the page they were trying to visit
    Swal.fire("Logged In!", "Welcome back, John!", "success");
}

// Simulate Signup
function signUpUser() {
    let dummyUser = {
        name: "New User",
        profilePic: "https://i.pravatar.cc/150?img=5"
    };

    localStorage.setItem("user", JSON.stringify(dummyUser));
    checkLoginStatus();
    window.location.href = getRedirectPage(); // Redirect to the page they were trying to visit
    Swal.fire("Signed Up!", "Your account has been created!", "success");
}

// Get the page to redirect after login/signup
function getRedirectPage() {
    let targetPage = sessionStorage.getItem('redirectPage');
    if (!targetPage) {
        targetPage = 'home.html'; // Default fallback page
    }
    sessionStorage.removeItem('redirectPage'); // Clear redirect after use
    return targetPage;
}