$(document).on('click', '#icon', function(event) {
    new swal({
        title: "We are sorry.",
        text: "This feature is not awailable yet :(",
        imageUrl: "../img/gi3.png",
        imageWidth: 400,
        imageHeight: 350,
        imageAlt: "Custom image"
      });
});

function goToPage() {
    window.location.href = "home.html";
}