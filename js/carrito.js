let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const cartIcon = document.getElementById("cart-icon");

function renderCart() {
  cartList.innerHTML = cart.map((p, i) => `
    <li class="text-fuchsia-900 flex justify-between items-center mb-2">
      <span class="text-fuchsia-900">${p.name} - $${p.price}</span>
      <button data-index="${i}" class="remove-from-cart bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
    </li>
  `).join("");
  cartTotal.textContent = cart.reduce((sum, p) => sum + p.price, 0);
  cartIcon.textContent = `🛒 (${cart.length})`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("add-to-cart")) {
    const card = e.target.closest("article");
    let name = "Producto";
    let price = 0;
    const h1 = card.querySelector("h1");
    if (h1) name = h1.textContent.trim();
    const priceSpan = card.querySelector("span.text-2xl");
    if (priceSpan) price = Number(priceSpan.textContent.trim());
    cart.push({ name, price });
    renderCart();
  }
  if (e.target.classList.contains("remove-from-cart")) {
    const idx = Number(e.target.getAttribute("data-index"));
    removeItem(idx);
  }
});

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

renderCart();