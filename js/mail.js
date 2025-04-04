document.addEventListener("DOMContentLoaded", () => {
    const message = sessionStorage.getItem("purchaseMessage");
    if (message) {
        document.querySelector(".mail-container").innerText = message;
    } else {
        document.querySelector(".mail-container").innerText = "Nincs új vásárlás.";
    }
});

fetch("/api/get-purchases")
    .then(response => response.json())
    .then(data => {
        const mailDiv = document.querySelector(".mail");
        mailDiv.innerHTML = "";
        if (data.length > 0) {
            data.forEach(purchase => {
                const p = document.createElement("p");
                p.textContent = `Sikeres vásárlás! Termékek: ${purchase.product_names}`;
                mailDiv.appendChild(p);
            });
        } else {
            mailDiv.innerText = "Nincs új vásárlás.";
        }
    })
    .catch(error => console.error("Hiba az üzenetek lekérésekor:", error));