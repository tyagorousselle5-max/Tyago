// Real products data with images
const products = [
    { 
        id: 1, 
        name: 'iPhone 15 Pro Max', 
        price: 1199.99, 
        image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
        description: 'Smartphone premium avec caméra professionnelle'
    },
    { 
        id: 2, 
        name: 'MacBook Pro 16"', 
        price: 2499.99, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        description: 'Ordinateur portable haute performance'
    },
    { 
        id: 3, 
        name: 'AirPods Pro', 
        price: 249.99, 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        description: 'Écouteurs sans fil avec réduction de bruit'
    },
    { 
        id: 4, 
        name: 'Apple Watch Series 9', 
        price: 399.99, 
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        description: 'Montre intelligente avec suivi de santé'
    },
    { 
        id: 5, 
        name: 'iPad Air', 
        price: 599.99, 
        image: 'https://images.unsplash.com/photo-1533910003211-6f800220426e?w=400&h=400&fit=crop',
        description: 'Tablette tactile performante et légère'
    },
    { 
        id: 6, 
        name: 'Canon EOS R6', 
        price: 2499.99, 
        image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=400&fit=crop',
        description: 'Appareil photo mirrorless professionnel'
    },
    {
        id: 7,
        name: 'Sony WH-1000XM5',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
        description: 'Casque audio sans fil haut de gamme'
    },
    {
        id: 8,
        name: 'Samsung Galaxy S24',
        price: 999.99,
        image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
        description: 'Téléphone dernier cri avec IA'
    },
    {
        id: 9,
        name: 'DJI Air 3S Drone',
        price: 1099.99,
        image: 'https://images.unsplash.com/photo-1606611260432-fa71c5a17ae4?w=400&h=400&fit=crop',
        description: 'Drone 4K avec caméra 48MP'
    },
    {
        id: 10,
        name: 'GoPro Hero 12',
        price: 499.99,
        image: 'https://images.unsplash.com/photo-1606933248051-5ce98f5b0c11?w=400&h=400&fit=crop',
        description: 'Caméra action 5.3K ultra compacte'
    },
    {
        id: 11,
        name: 'Nintendo Switch OLED',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
        description: 'Console portable avec écran OLED'
    },
    {
        id: 12,
        name: 'Logitech MX Master 3S',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
        description: 'Souris sans fil ergonomique premium'
    }
];

let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    loadCart();
});

function displayProducts() {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;"></div>
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

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

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

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    displayCart();
}

document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            displayCart();
            document.getElementById('cart-modal').style.display = 'block';
        });
    }
});

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide!');
        return;
    }
    window.location.href = 'payment.html';
}

function sendMessage(event) {
    event.preventDefault();
    alert('Merci pour votre message! Nous vous répondrons bientôt.');
    event.target.reset();
}

window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (modal && event.target == modal) {
        modal.style.display = 'none';
    }
}