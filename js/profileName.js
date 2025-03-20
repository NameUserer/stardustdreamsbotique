const inputName = document.getElementById('name');
const btnEdit = document.getElementsByClassName('edit-button')[0];

btnEdit.addEventListener('click', editProfileName);

async function editProfileName() {
    const username = document.getElementById('name').value;
    console.log(username);
    
    const res = await fetch('/api/profile/editProfileName', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username }),
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        resetInputs();
        Swal.fire({
            title: 'Successfull change!',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(() => {
            window.location.href = '../profile.html';
        });
    } else if (data.errors) {
        let errorMessage = '';
        for (let i = 0; i < data.errors.length; i++) {
            errorMessage += `${data.errors[i].error}\n`
        }
        Swal.fire({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else if (data.error) {
        Swal.fire({
            title: 'Error!',
            text: data.error,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        Swal.fire({
            title: 'Unknown error!',
            text: 'Try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

function resetInputs() {
    document.getElementById('name').value = null;
}