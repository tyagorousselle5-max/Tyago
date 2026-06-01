// Sample products data
const products = [
    { id: 1, name: 'Produit Premium 1', price: 49.99, emoji: '📱', description: 'Produit de qualité supérieure' },
    { id: 2, name: 'Produit Premium 2', price: 79.99, emoji: '💻', description: 'Technologie de pointe' },
    { id: 3, name: 'Produit Premium 3', price: 39.99, emoji: '🎧', description: 'Son cristallin' },
    { id: 4, name: 'Produit Premium 4', price: 89.99, emoji: '⌚', description: 'Style et performance' },
    { id: 5, name: 'Produit Premium 5', price: 59.99, emoji: '🎮', description: 'Expérience immersive' },
    { id: 6, name: 'Produit Premium 6', price: 69.99, emoji: '📷', description: 'Qualité photo exceptionnelle' }
];

// Cart array
let cart = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    loadCart();
});

// Display products
function displayProducts() {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price}€</div>
                <button class="btn-add-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Ajouter au Panier</button>
            </div>
        `;
        productsList.appendChild(productCard);
    });
}

// Add to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    alert(`${name} ajouté au panier!`);
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Display cart
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Votre panier est vide</p>';
        document.getElementById('total-price').textContent = '0';
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <div>
                <span>${itemTotal.toFixed(2)}€</span>
                <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; padding: 5px 10px; background-color: #ff6b6b; color: white; border: none; border-radius: 3px; cursor: pointer;">Supprimer</button>
            </div>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });
    
    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    displayCart();
}

// Open cart modal
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.cart-icon').addEventListener('click', function() {
        displayCart();
        document.getElementById('cart-modal').style.display = 'block';
    });
});

// Close cart modal
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide!');
        return;
    }
    alert('Merci pour votre achat! Montant total: ' + document.getElementById('total-price').textContent + '€\n\nCeci est une démo. En production, vous seriez redirigé vers un système de paiement.');
    cart = [];
    saveCart();
    updateCartCount();
    closeCart();
}

// Send message (Contact form)
function sendMessage(event) {
    event.preventDefault();
    alert('Merci pour votre message! Nous vous répondrons bientôt.');
    event.target.reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}