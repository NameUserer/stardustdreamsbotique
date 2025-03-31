const iconLogout = document.getElementsByClassName('icon-logout')[0];
const btnPic = document.getElementsByClassName('edit-pic')[0];

document.addEventListener('DOMContentLoaded', getProfilPic);

document.addEventListener('DOMContentLoaded', getUsername);

document.addEventListener('DOMContentLoaded', getAddress);

iconLogout.addEventListener('click', logout);

btnPic.addEventListener('click', () => {
    window.location.href = '../profilePic.html';
});

async function getProfilPic() {
    const res = await fetch('/api/profile/pic', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
        const editPic = document.getElementsByClassName('edit-pic')[0];
        editPic.style.backgroundImage = `url('/uploads/${data[0].profile_pic}')`;
    }
}

async function getUsername() {
    try {
        const res = await fetch('/api/user/username', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await res.json();
        console.log(data); // Check what the API returns

        if (res.ok && data && data.username) { // Adjust this based on response structure
            const usernameElement = document.querySelector('.username');
            if (usernameElement) {
                usernameElement.textContent = data.username; // Use correct property
            } else {
                console.warn("Element with class 'username' not found.");
            }
        } else {
            console.warn("Invalid API response:", data);
        }
    } catch (error) {
        console.error("Error fetching username:", error);
    }
}

async function getAddress() {
    try {
        const res = await fetch('/api/user/address', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await res.json();
        console.log(data); // Check what the API returns

        if (res.ok && data && data.address) { // Adjust this based on response structure
            const addressElement = document.querySelector('.address');
            if (addressElement) {
                addressElement.textContent = data.address; // Use correct property
            } else {
                console.warn("Element with class 'address' not found.");
            }
        } else {
            console.warn("Invalid API response:", data);
        }
    } catch (error) {
        console.error("Error fetching address:", error);
    }
}

async function logout() {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();

    if (res.ok) {
        Swal.fire({
            title: 'Successfull logged out!',
            text: data.message,
            imageUrl: './img/ganyu.webp',
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: 'Go'
        }).then(() => {
            window.location.href = '../home.html';
        });
    } else {
        Swal.fire({
            title: 'Error, cannot log out!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}