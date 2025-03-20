const btnReg = document.getElementsByClassName('reg')[0];

btnReg.addEventListener('click', register);

async function register() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    console.log(email, username, password);
    if (password !== password2) {
        return Swal.fire({
            title: 'Error!',
            text: 'The two passwords not matching!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }

    const res = await fetch('/api/auth/register', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
        resetInputs();
        Swal.fire({
            title: 'Successfull registration!',
            text: data.message,
            imageUrl: './img/Xangling.png',
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: 'Go'
        }).then(() => {
            window.location.href = '../home.html';
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
    document.getElementById('email').value = null;
    document.getElementById('name').value = null;
    document.getElementById('password').value = null;
    document.getElementById('password2').value = null;
}