const bntEdit = document.getElementsByClassName('edit-button')[0];
const backbutton = document.getElementsByClassName('back')[0];

backbutton.addEventListener('click', () => {
    window.location.href = '../profile.html';
});

document.addEventListener('DOMContentLoaded', getProfilPic);

bntEdit.addEventListener('click', editProfilePic);

async function editProfilePic() {
    const profile_pic = document.getElementById('fileUpload').files[0];
    console.log(profile_pic);
    
    const formData = new FormData();
    formData.append('profile_pic', profile_pic);

    const res = await fetch('/api/profile/editProfilePic', {
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
    const res = await fetch('/api/profile/getProfilePic', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        const editPic = document.getElementsByClassName('edit-pics')[0];
        editPic.style.backgroundImage = `url('/uploads/${data[0].profile_pic}')`;
    }
}