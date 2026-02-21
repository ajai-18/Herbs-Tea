function loadCart() {
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let products = JSON.parse(localStorage.getItem('products')) || [];

  // filter only current user's cart
  let userCart = cart.filter(c => c.user === user.email);

  let cartDiv = document.getElementById('cartItems');
  cartDiv.innerHTML = "";

  if (userCart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
    return;
  }

  let total = 0;

  userCart.forEach((c, index) => {
    let prod = products.find(p => p.id === c.productId);
    let itemTotal = prod.price * c.qty;
    total += itemTotal;

    cartDiv.innerHTML += `
      <div class="card mb-3 p-3 shadow-sm">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5>${prod.name}</h5>
            <p>Price: ₹${prod.price}</p>
            <p>Quantity: 
              <button class="btn btn-sm btn-outline-success" onclick="updateQty(${c.productId}, -1)">-</button>
              <span class="mx-2">${c.qty}</span>
              <button class="btn btn-sm btn-outline-success" onclick="updateQty(${c.productId}, 1)">+</button>
            </p>
            <p><strong>Total: ₹${itemTotal}</strong></p>
          </div>
          <div>
            <button class="btn btn-danger btn-sm" onclick="removeItem(${c.productId})">Remove</button>
            <button class="btn btn-success btn-sm" onclick="buyNow(${c.productId})">Buy Now</button>
          </div>
        </div>
      </div>
    `;
  });

  cartDiv.innerHTML += `<h4 class="mt-3 text-end">Grand Total: ₹${total}</h4>
    <button class="btn btn-primary w-100 mt-3" onclick="checkout()">Checkout All</button>`;
}

// Increase/Decrease qty
function updateQty(productId, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  cart = cart.map(c => {
    if (c.user === user.email && c.productId === productId) {
      c.qty = Math.max(1, c.qty + change); // min qty = 1
    }
    return c;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Remove item
function removeItem(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  cart = cart.filter(c => !(c.user === user.email && c.productId === productId));
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Buy Now (single item checkout)
function buyNow(productId) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  let prod = products.find(p => p.id === productId);
  alert(`You bought ${prod.name} for ₹${prod.price}. Order placed! Waiting for admin approval.`);
  removeItem(productId);
}

// Checkout all
function checkout() {
  alert("Order placed! Waiting for admin approval.");
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(c => c.user !== user.email); // clear only current user's cart
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location = "products.html";
}

loadCart();
