const products = [
  {id: 1, category: 'hoodie', name: 'Худі чорне', price: 1200, img: 'img/hoodie1.jpg'},
  {id: 2, category: 'hoodie', name: 'Худі сіре', price: 1100, img: 'img/hoodie2.jpg'},
  {id: 3, category: 'tshirt', name: 'Футболка біла', price: 700, img: 'img/tshirt1.jpg'},
  {id: 4, category: 'tshirt', name: 'Футболка чорна', price: 750, img: 'img/tshirt2.jpg'},
  {id: 5, category: 'pants', name: 'Штани чорні', price: 1500, img: 'img/pants1.jpg'},
  {id: 6, category: 'accessory', name: 'Кепка чорна', price: 400, img: 'img/accessory1.jpg'},
  {id: 7, category: 'bracelet', name: 'Браслет шкіряний', price: 300, img: 'img/bracelet1.jpg'},
];

// --- Фільтрація каталогу ---

const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.category;
    productCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// --- Випадкові товари для слайдшоу "Товари дня" ---

const dailyProductsSlider = document.querySelector('.daily-products-slider');

function getRandomProducts(num = 4) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function renderDailyProducts() {
  const randomProducts = getRandomProducts(4);
  dailyProductsSlider.innerHTML = '';
  randomProducts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.minWidth = '200px';
    card.style.flex = '0 0 auto';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p class="price">₴${p.price}</p>
      <button class="add-to-cart" data-id="${p.id}">Додати в кошик</button>
    `;
    dailyProductsSlider.appendChild(card);
  });
}

// --- Кошик ---

const cart = document.getElementById('cart');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cartItems = [];

function updateCart() {
  cartItemsList.innerHTML = '';
  let total = 0;
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="cart-item-name">${item.name}</span>
      <span class="cart-item-price">₴${item.price}</span>
      <button class="remove-item-btn" data-id="${item.id}" aria-label="Видалити товар">&times;</button>
    `;
    cartItemsList.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = `₴${total}`;
}

// Додати товар у кошик
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  cartItems.push(product);
  updateCart();
}

// Видалити товар з кошика
cartItemsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-item-btn')) {
    const id = Number(e.target.dataset.id);
    cartItems = cartItems.filter(item => item.id !== id);
    updateCart();
  }
});

// Відкриття/закриття кошика
openCartBtn.addEventListener('click', () => {
  cart.classList.remove('hidden');
});

closeCartBtn.addEventListener('click', () => {
  cart.classList.add('hidden');
});

// Додавання товарів із каталогу та слайдшоу
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const id = Number(e.target.dataset.id);
    if (id) {
      addToCart(id);
    } else {
      // Якщо кнопка без data-id (наприклад, у каталозі), шукати по тексту назви
      const card = e.target.closest('.product-card');
      if (card) {
        const name = card.querySelector('h3').textContent;
        const product = products.find(p => p.name === name);
        if (product) addToCart(product.id);
      }
    }
  }
});

// --- Кнопка Сплатити ---
checkoutBtn.addEventListener('click', () => {
  window.location.href = 'checkout.html';
});

// --- Старт ---
renderDailyProducts();