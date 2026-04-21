// Data Produk Dummy
const products = [
    { id: 1, name: 'Laptop Gaming', category: 'electronics', price: 15000000, emoji: '💻', description: 'Performa tinggi untuk gaming' },
    { id: 2, name: 'Smartphone Pro', category: 'electronics', price: 8000000, emoji: '📱', description: 'Kamera 108MP terbaik' },
    { id: 3, name: 'Headphones Wireless', category: 'electronics', price: 2000000, emoji: '🎧', description: 'Suara premium dengan noise cancellation' },
    { id: 4, name: 'Jaket Denim', category: 'fashion', price: 500000, emoji: '👕', description: 'Casual & stylish' },
    { id: 5, name: 'Sepatu Sneakers', category: 'fashion', price: 800000, emoji: '👟', description: 'Nyaman untuk sehari-hari' },
    { id: 6, name: 'Jam Tangan Digital', category: 'fashion', price: 1200000, emoji: '⌚', description: 'Waterproof & design modern' },
    { id: 7, name: 'Programming in Go', category: 'books', price: 250000, emoji: '📖', description: 'Buku pemrograman Go terlengkap' },
    { id: 8, name: 'Web Development Guide', category: 'books', price: 300000, emoji: '📚', description: 'Panduan lengkap HTML, CSS, JS' },
    { id: 9, name: 'Pot Tanaman Smart', category: 'home', price: 450000, emoji: '🪴', description: 'IoT untuk tanaman kesayangan' },
    { id: 10, name: 'Lampu LED RGB', category: 'home', price: 350000, emoji: '💡', description: '16 juta warna yang bisa dikontrol' },
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi simpan cart ke localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Fungsi untuk menampilkan produk
function displayProducts(productsToShow = products) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">Rp ${product.price.toLocaleString('id-ID')}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Fungsi tambah ke cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    alert(`${product.name} ditambahkan ke cart!`);
}

// Fungsi hapus dari cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Fungsi update UI cart
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    cartCount.textContent = cart.length;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span class="cart-item-name">${item.name} x${item.quantity}</span>
            <span class="cart-item-price">Rp ${itemTotal.toLocaleString('id-ID')}</span>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = total.toLocaleString('id-ID');
}

// Fungsi buka cart
function openCart() {
    const cartModal = document.getElementById('cart');
    cartModal.style.display = 'flex';
}

// Fungsi tutup cart
function closeCart() {
    const cartModal = document.getElementById('cart');
    cartModal.style.display = 'none';
}

// Fungsi search
function searchProducts() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const categoryValue = document.getElementById('category-filter').value;

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchValue);
        const matchesCategory = !categoryValue || product.category === categoryValue;
        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

// Event listeners
document.getElementById('search-input').addEventListener('keyup', searchProducts);
document.getElementById('category-filter').addEventListener('change', searchProducts);

// Buka cart dari navbar
document.querySelector('.cart-btn').addEventListener('click', openCart);

// Inisialisasi
displayProducts();
updateCartUI();