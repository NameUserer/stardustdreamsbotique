const addbutton = document.getElementsByClassName('add')[0];
const deletebutton = document.getElementsByClassName('delete')[0];

deletebutton.addEventListener('click', () => {
    window.location.href = '../delete.html';
});
addbutton.addEventListener('click', () => {
    window.location.href = '../add.html';
});