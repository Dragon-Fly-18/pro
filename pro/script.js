
const products = [
    {
        id: 2,
        name: "FC Barcelona Home Jersey 2025",
        price: 89.99,
        image: "images/barcelona.jpg",
        category: "featured"
    },
    {
        id: 1,
        name: "Real Madrid Home Jersey 2025",
        price: 94.99,
        image: "images/real madrid.jpg",
        category: "featured"
    },
    {
        id: 3,
        name: "Manchester United Home Jersey 2025",
        price: 79.99,
        image: "images/man united.jpg",
        category: "featured"
    },
    {
        id: 4,
        name: "Liverpool Home Jersey 2025",
        price: 87.99,
        image: "images/liverpool.jpg",
        category: "featured"
    },
    {
        id: 5,
        name: "PSG Home Jersey 2025",
        price: 92.99,
        image: "images/paris.jpg",
        category: "featured"
    },
    {
        id: 6,
        name: "Brazil National Team Jersey 2025",
        price: 94.99,
        image: "images/brazil.jpeg",
        category: "new"
    },
    {
        id: 7,
        name: "Portugal Jersey 2025",
        price: 90.99,
        image: "images/portugal.jpeg",
        category: "new"
    },
    {
        id: 8,
        name: "Argentina Jersey 2025",
        price: 88.99,
        image: "images/Argentina.jpg",
        category: "new"
    },
    {
        id: 9,
        name: "France Jersey 2025",
        price: 92.99,
        image: "images/france.jpg",
        category: "new"
    },
    {
        id: 10,
        name: "Germany Jersey 2025",
        price: 80.99,
        image: "images/germany.jpg",
        category: "new"
    }
];


let cart = [];


const featuredProductsGrid = document.querySelector('.featured-products .products-grid');
const newArrivalsGrid = document.querySelector('.new-arrivals .products-grid');
const cartModal = document.querySelector('.cart-modal');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPriceElement = document.querySelector('.total-price');
const cartIcon = document.querySelector('.cart-icon');
const closeCartBtn = document.querySelector('.close-cart');
const checkoutBtn = document.querySelector('.checkout-btn');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');


function displayProducts() {
    featuredProductsGrid.innerHTML = '';
    newArrivalsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>Authentic official jersey</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        if (product.category === 'featured') {
            featuredProductsGrid.appendChild(productCard);
        } else if (product.category === 'new') {
            newArrivalsGrid.appendChild(productCard);
        }
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}


function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification();
}


function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            <span class="remove-item" data-id="${item.id}">&times;</span>
        `;
        cartItemsContainer.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    totalPriceElement.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}


function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = 'Item added to cart!';
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--success-color)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '3000';
    notification.style.animation = 'slideIn 0.5s, fadeOut 0.5s 2.5s';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Remove item from cart
function removeFromCart(e) {
    if (e.target.classList.contains('remove-item')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
}


function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert(`Thank you for your purchase! Total: $${totalPriceElement.textContent}`);
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
}


cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

cartItemsContainer.addEventListener('click', removeFromCart);
checkoutBtn.addEventListener('click', checkout);


hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


displayProducts();
updateCart();


document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.hero-content, .product-card, .contact-form');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});