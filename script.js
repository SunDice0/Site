const cartBtn = document.getElementById("cart-btn");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let total = 0;

cartBtn.addEventListener("click", () => {
  cart.classList.toggle("hidden");
});

closeCart.addEventListener("click", () => {
  cart.classList.add("hidden");
});

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    const product = e.target.closest(".product-card");
    const name = product.querySelector("h3").innerText;
    const priceText = product.querySelector(".price").innerText;
    const price = parseInt(priceText.replace("₴", ""));

    const li = document.createElement("li");
    li.innerText = `${name} — ₴${price}`;
    cartItems.appendChild(li);

    total += price;
    cartTotal.innerText = `₴${total}`;
  });
});

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    document.querySelectorAll(".product-card").forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});