const inputName = document.getElementById('name');
const btnEdit = document.getElementsByClassName('edit-button')[0];

btnEdit.addEventListener('click', editProfileName);

async function editProfileName() {
    const name = document.getElementById('name').value;
    console.log(name);
    
    const res = await fetch('http://127.0.0.1:3000/api/editProfileName', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ name }),
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
    document.getElementById('name').value = null;
}