const btnName = document.getElementById('editName');
const btnPsw = document.getElementById('editPsw');
const btnAddress = document.getElementById('editAddress');

btnName.addEventListener('click', () => {
    window.location.href = '../profileName.html';
});

btnPsw.addEventListener('click', () => {
    window.location.href = '../profilePsw.html';
});

btnAddress.addEventListener('click', () => {
    window.location.href = '../profileAddress.html';
});