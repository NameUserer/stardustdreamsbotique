const iconLogout = document.getElementsByClassName('icon-logout')[0];
const btnPic = document.getElementsByClassName('edit-pic')[0];

document.addEventListener('DOMContentLoaded', getProfilPic);

document.addEventListener('DOMContentLoaded', getUsername);


//iconLogout.addEventListener('click', logout);

btnPic.addEventListener('click', () => {
    window.location.href = '../profilePic.html';
});

async function getProfilPic() {
    const res = await fetch('/api/profile/getProfilePic', {
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
    const res = await fetch('/api/user/username', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
        const usernameElement = document.getElementsByClassName('username')[0];
        usernameElement.textContent = data[0].username;
    }
}

/*async function logout() {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();

    if (res.ok) {
        alert(data.message);
        window.location.href = '../home.html';
    } else {
        alert('Hiba a kijelentkezéskor');
    }
}*/