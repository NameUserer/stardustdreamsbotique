document.addEventListener("DOMContentLoaded", () => {
    const message = localStorage.getItem("purchaseMessage");
    if (message) {
        document.querySelector(".mail").innerText = message;
        localStorage.removeItem("purchaseMessage"); // Üzenet törlése, hogy ne maradjon ott
    } else {
        document.querySelector(".mail-container").innerText = "Nincs új vásárlás.";
    }
});