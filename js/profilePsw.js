const inputName = document.getElementById('name');
const btnEdit = document.getElementsByClassName('edit-button')[0];

btnEdit.addEventListener('click', editProfilePsw);

async function editProfilePsw() {
    const password = document.getElementById('psw').value;
    console.log(password);
    
    const res = await fetch('/api/profile/editProfilePassword', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ password }),
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        resetInputs();
        alert(data.message);
        window.location.href = '../profile.html';
    } else if (data.errors) {
        let errorMessage = '';
        for (let i = 0; i < data.errors.length; i++) {
            errorMessage += `${data.errors[i].error}\n`
        }
        alert(errorMessage);
    } else if (data.error) {
        alert(data.error);
    } else {
        alert('Ismeretlen hiba');
    }
}

function resetInputs() {
    document.getElementById('psw').value = null;
    document.getElementById('psw2').value = null;
}