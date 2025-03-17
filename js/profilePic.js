const bntEdit = document.getElementsByClassName('edit-button')[0];

document.addEventListener('DOMContentLoaded', getProfilPic);

bntEdit.addEventListener('click', editProfilePic);

async function editProfilePic() {
    const profile_pic = document.getElementById('fileUpload').files[0];
    console.log(profile_pic);
    
    const formData = new FormData();
    formData.append('profile_pic', profile_pic);

    const res = await fetch('http://127.0.0.1:3000/api/profile/editProfilePic', {
        method: 'PUT',
        body: formData,
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        alert(data.message);
        window.location.href = '../profile.html';
    } else {
        alert(data.error);
    }
}

async function getProfilPic() {
    const res = await fetch('http://127.0.0.1:3000/api/profile/getProfilePic', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        const editPic = document.getElementsByClassName('edit-pic')[0];
        editPic.style.backgroundImage = `url('http://127.0.0.1:3000/uploads/${data[0].profile_pic}')`;
    }
}