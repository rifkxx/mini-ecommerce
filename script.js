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

// Fungsi buka checkout
function openCheckout() {
    if (cart.length === 0) {
        alert('Cart kamu kosong! Tambahkan produk dulu.');
        return;
    }
    
    const checkoutModal = document.getElementById('checkout');
    const checkoutItemCount = document.getElementById('checkout-item-count');
    const checkoutTotal = document.getElementById('checkout-total');
    
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    
    checkoutItemCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    checkoutTotal.textContent = total.toLocaleString('id-ID');
    
    closeCart();
    checkoutModal.style.display = 'flex';
}

// Fungsi tutup checkout
function closeCheckout() {
    const checkoutModal = document.getElementById('checkout');
    checkoutModal.style.display = 'none';
}

// Fungsi konfirmasi order
function confirmOrder() {
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    
    // Validasi
    if (!fullname || !email || !phone || !address) {
        alert('Semua field harus diisi!');
        return;
    }
    
    // Buat order number random
    const orderNumber = 'ORD-' + Date.now();
    
    // Simpan order ke localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
        orderNumber: orderNumber,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        payment: payment,
        items: cart,
        totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toLocaleDateString('id-ID')
    });
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Tampilkan success modal
    const successModal = document.getElementById('success-modal');
    const orderNumberEl = document.getElementById('order-number');
    orderNumberEl.textContent = orderNumber;
    
    closeCheckout();
    successModal.style.display = 'flex';
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
}

// Fungsi kembali ke home
function backToHome() {
    const successModal = document.getElementById('success-modal');
    successModal.style.display = 'none';
    
    // Reset form
    document.getElementById('checkout-form').reset();
    
    // Scroll ke top
    window.scrollTo(0, 0);
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

// ============ ORDER HISTORY FUNCTIONS ============

// Fungsi buka order history
function openOrderHistory() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderHistoryModal = document.getElementById('order-history');
    const ordersList = document.getElementById('orders-list');
    const emptyOrders = document.getElementById('empty-orders');
    
    if (orders.length === 0) {
        ordersList.style.display = 'none';
        emptyOrders.style.display = 'block';
    } else {
        ordersList.style.display = 'flex';
        emptyOrders.style.display = 'none';
        
        ordersList.innerHTML = '';
        orders.reverse().forEach((order, index) => {
            const itemsPreview = order.items.map(item => `${item.name} (x${item.quantity})`).join(', ');
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            orderCard.innerHTML = `
                <div class="order-card-header">
                    <span class="order-number">${order.orderNumber}</span>
                    <span class="order-date">${order.date}</span>
                </div>
                <div class="order-card-body">
                    <div class="order-items-preview">${itemsPreview}</div>
                </div>
                <div class="order-card-footer">
                    <div class="order-total">
                        Total: <span class="order-price">Rp ${order.totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div style="display: flex; gap: 5px;">
                        <button class="btn-view-detail" onclick="viewOrderDetail(${orders.length - 1 - index})">Detail</button>
                        <button class="btn-delete-order" onclick="deleteOrder(${orders.length - 1 - index})">Delete</button>
                    </div>
                </div>
            `;
            ordersList.appendChild(orderCard);
        });
    }
    
    orderHistoryModal.style.display = 'flex';
}

// Fungsi tutup order history
function closeOrderHistory() {
    const orderHistoryModal = document.getElementById('order-history');
    orderHistoryModal.style.display = 'none';
}

// Fungsi lihat detail order
function viewOrderDetail(index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders[index];
    
    if (!order) return;
    
    const orderDetailModal = document.getElementById('order-detail');
    const orderDetailInfo = document.getElementById('order-detail-info');
    
    let itemsHtml = '';
    order.items.forEach(item => {
        itemsHtml += `
            <div class="detail-item">
                <span class="detail-item-name">${item.name}</span>
                <span class="detail-item-qty">x${item.quantity}</span>
                <span class="detail-item-price">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
            </div>
        `;
    });
    
    orderDetailInfo.innerHTML = `
        <div class="detail-section">
            <h3>Nomor Pesanan</h3>
            <div class="detail-row">
                <span class="detail-label">Order ID</span>
                <span class="detail-value">${order.orderNumber}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Tanggal</span>
                <span class="detail-value">${order.date}</span>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>Informasi Pengiriman</h3>
            <div class="detail-row">
                <span class="detail-label">Nama</span>
                <span class="detail-value">${order.fullname}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email</span>
                <span class="detail-value">${order.email}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Telepon</span>
                <span class="detail-value">${order.phone}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Alamat</span>
                <span class="detail-value">${order.address}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Metode Pembayaran</span>
                <span class="detail-value">${order.payment.toUpperCase()}</span>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>Item Pesanan</h3>
            <div class="detail-items">
                ${itemsHtml}
            </div>
        </div>
        
        <div class="detail-section">
            <div class="detail-row">
                <span class="detail-label">TOTAL HARGA</span>
                <span class="detail-value">Rp ${order.totalPrice.toLocaleString('id-ID')}</span>
            </div>
        </div>
        
        <button type="button" class="btn-close-detail" onclick="closeOrderDetail()">Tutup</button>
    `;
    
    orderDetailModal.style.display = 'flex';
}

// Fungsi tutup order detail
function closeOrderDetail() {
    const orderDetailModal = document.getElementById('order-detail');
    orderDetailModal.style.display = 'none';
}

// Fungsi delete order
function deleteOrder(index) {
    if (confirm('Yakin ingin menghapus pesanan ini?')) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Update UI
        openOrderHistory();
        alert('Pesanan berhasil dihapus!');
    }
}

// Event listeners
document.getElementById('search-input').addEventListener('keyup', searchProducts);
document.getElementById('category-filter').addEventListener('change', searchProducts);

// Buka cart dari navbar
document.querySelector('.cart-btn').addEventListener('click', openCart);

// Inisialisasi
displayProducts();
updateCartUI();
