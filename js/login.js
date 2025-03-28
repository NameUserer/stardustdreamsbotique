const btnLogin = document.getElementsByClassName('login')[0];

btnLogin.addEventListener('click', login);

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
        resetInputs();

        if (data.user_id === 9) {
            Swal.fire({
                title: 'Welcome Admin!',
                text: data.message,
                imageUrl: './img/klee.png',
                imageWidth: 200,
                imageHeight: 200,
                confirmButtonText: 'Go to Admin Page'
            }).then(() => {
                window.location.href = '../admin.html';
            });
        } else {
            Swal.fire({
                title: 'Successfully logged in!',
                text: data.message,
                imageUrl: './img/klee.png',
                imageWidth: 200,
                imageHeight: 200,
                confirmButtonText: 'Go'
            }).then(() => {
                window.location.href = '../home.html';
            });
        }
    } else if (data.errors) {
        let errorMessage = '';
        for (let i = 0; i < data.errors.length; i++) {
            errorMessage += `${data.errors[i].error}\n`;
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
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}