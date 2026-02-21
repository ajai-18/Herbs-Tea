let products = JSON.parse(localStorage.getItem('products')) || [
  {id:1, name:"Green Tea", price:150, stock:10, desc:"Refreshing herbal tea"},
  {id:2, name:"Lemon Tea", price:120, stock:15, desc:"Tangy and healthy"},
  {id:3, name:"Tulsi Tea", price:180, stock:8, desc:"Boosts immunity"}
];
localStorage.setItem('products', JSON.stringify(products));

function loadProducts() {
  let productList = document.getElementById('productList');
  productList.innerHTML = "";
  products.forEach(p => {
    productList.innerHTML += `
      <div class="col-md-4">
        <div class="card p-2 mb-3">
          <h5>${p.name}</h5>
          <p>${p.desc}</p>
          <p><b>₹${p.price}</b></p>
          <button onclick="addToCart(${p.id})" class="btn btn-success">Add to Cart</button>
        </div>
      </div>`;
  });
}

function addToCart(productId) {
  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    alert("Login first!");
    window.location = "login.html";
    return;
  }
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({user:user.email, productId:productId, qty:1});
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Added to cart!");
}

loadProducts();
