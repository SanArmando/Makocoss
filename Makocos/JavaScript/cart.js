const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price");
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para agregar productos al carrito
const addToCart = (btn) => {
  const name = btn.dataset.name;
  const price = parseFloat(btn.dataset.price);

  if (!name || isNaN(price)) {
    console.error("Datos inválidos para el producto");
    return;
  }

  // Verificar si el producto ya está en el carrito
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    alert("Este producto ya está en el carrito.");
    return;
  }

  const item = { name, price };
  cart.push(item);
  updateCartUI();
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Actualizar la interfaz del carrito
const updateCartUI = () => {
  cartList.innerHTML = ""; // Limpiar el listado actual
  let total = 0;

  // Crear un listado de los productos en el carrito
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
    total += item.price;
  });

  // Mostrar el total
  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
};

// Manejar eventos de los botones "Agregar al carrito"
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => addToCart(btn));
});

// JavaScript para el menú responsivo
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.menu-links').classList.toggle('show');
});

// Cargar el carrito al iniciar
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});