// updatecart
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemsContainer = document.getElementById('cart-items');
    const subPriceElement = document.querySelector('.sub-price');
    const totalElement = document.getElementById('total');

    cartItemsContainer.innerHTML = ''; // Clear existing items
    let total = 0;

    if (Object.keys(cart).length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in cart</p>';
        subPriceElement.textContent = 'Rs 0';
        totalElement.textContent = 'Rs 0';
        return;
    }
    for (const product in cart) {
        const item = cart[product];
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="item-info">
                <div class="sofa-check-out">
                    <img src="${item.image}" alt="${product}">
                </div>
            </div>
            <div class="detail-product-check-out">
                <div class="check-out-text name">${product}</div>
                <div class="check-out-text price">Rs. ${item.price.toLocaleString()}</div>
                <div class="quantity">
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-product="${product}">
                </div>
                <div class="detail-price">Rs. ${subtotal.toLocaleString()}</div>
            </div>
            <div class="trash">
                <img src="image/trash.png" alt="trash" onclick="removeFromCart('${product}')">
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    }

    subPriceElement.textContent = `Rs ${total.toLocaleString()}`;
    totalElement.textContent = `Rs ${total.toLocaleString()}`;

    initializeQuantityListeners();
}

function initializeQuantityListeners() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const product = e.target.dataset.product;
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                updateQuantity(product, newQuantity);
            }
        });
    });
}

// uodate quantity
function updateQuantity(product, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[product]) {
        cart[product].quantity = quantity; // Update quantity
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
        updateCart(); // Re-render cart
    }
}


//  add product to the cart
function addToCart(productName, productInform, productPrice, productImage) {
    const cleanedPrice = parseFloat(productPrice.replace(/[^0-9.-]+/g, ''));

    if (isNaN(cleanedPrice)) {
        console.error("Invalid price for product:", productName);
        return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (cart[productName]) {
        cart[productName].quantity += 1;
    } else {
 
        cart[productName] = {
            inform: productInform,
            price: cleanedPrice,
            image: productImage,
            quantity: 1
        };
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
    console.log("Cart updated:", cart);
}


// removeFromCart 
function removeFromCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[product]) {
        delete cart[product];
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product} has been removed from your cart.`);
        updateCart();
    } else {
        console.warn('Attempted to remove non-existent product:', product);
    }
}
