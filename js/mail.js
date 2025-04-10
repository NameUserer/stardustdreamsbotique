document.addEventListener("DOMContentLoaded", () => {
    const message = "Sikeres vásárlás! Köszönjük, hogy nálunk vásároltál! A csomagod 10-12 munkanapon belül megérkezik.";
    const container = document.querySelector(".mail-container");
    container.innerText = message;

    fetch("/api/get-purchases")
        .then(response => response.json())
        .then(data => {
            const mailDiv = document.querySelector(".mail");
            mailDiv.innerHTML = "";
            if (data.length > 0) {
                data.forEach(purchase => {
                    const p = document.createElement("p");
                    p.textContent = `Termékek: ${purchase.product_names}`;
                    mailDiv.appendChild(p);
                });
            } else {
                mailDiv.innerText = "Nincs új vásárlás.";
            }
        })
        .catch(error => console.error("Hiba az üzenetek lekérésekor:", error));
});