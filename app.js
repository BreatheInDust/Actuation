document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");
    const totalDisplay = document.querySelector(".total");
    const addToCartButton = document.getElementById("addToCart");

    let selections = {};

    cards.forEach(card => {
        card.addEventListener("click", () => {

            const group = card.dataset.group;
            const price = parseInt(card.dataset.price);

            // Remove selection from same group
            document
                .querySelectorAll(`.card[data-group='${group}']`)
                .forEach(c => c.classList.remove("selected"));

            // Mark current as selected
            card.classList.add("selected");

            // Save selection
            selections[group] = {
                name: card.querySelector(".card-content div").textContent,
                price: price
            };

            updateTotal();
            validateConfiguration();
        });
    });

    function updateTotal() {
        let total = 0;

        for (let key in selections) {
            total += selections[key].price;
        }

        totalDisplay.textContent = "Total: €" + total;
    }

    function validateConfiguration() {
        const requiredGroups = ["barebone", "switch", "keycap", "assembly"];

        const allSelected = requiredGroups.every(group => selections[group]);

        addToCartButton.disabled = !allSelected;
    }

    // Placeholder Add To Cart behavior (no real cart logic yet)
    addToCartButton.addEventListener("click", () => {

        if (addToCartButton.disabled) return;

        console.log("Configuration Added:", selections);

        alert("Configuration added. Cart system not yet implemented.");

    });

});