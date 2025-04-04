document.addEventListener("DOMContentLoaded", () => {
    const message = sessionStorage.getItem("purchaseMessage");
    if (message) {
        document.querySelector(".mail-container").innerText = message;
    } else {
        document.querySelector(".mail-container").innerText = "Nincs új vásárlás.";
    }
});