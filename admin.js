// Load Products from localStorage
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((p, index) => {
    productList.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>₹${p.price}</td>
        <td><img src="${p.image}" width="60" height="40"/></td>
        <td>
          <button class="btn btn-delete btn-sm" onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add New Product
document.getElementById("addProductForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("productName").value;
  let price = parseInt(document.getElementById("productPrice").value);
  let image = document.getElementById("productImage").value;

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let newProduct = { id: Date.now(), name, price, image };
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
  this.reset();
});

// Delete Product
function deleteProduct(id) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

// Load Orders
function loadOrders() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let orderList = document.getElementById("orderList");
  orderList.innerHTML = "";

  orders.forEach((o, index) => {
    let prod = products.find(p => p.id === o.productId);
    orderList.innerHTML += `
      <tr>
        <td>${o.id}</td>
        <td>${o.user}</td>
        <td>${prod ? prod.name : "Deleted Product"}</td>
        <td>${o.qty}</td>
        <td>₹${prod ? prod.price * o.qty : 0}</td>
        <td>
          <button class="btn btn-approve btn-sm" onclick="approveOrder(${o.id})">Approve</button>
          <button class="btn btn-reject btn-sm" onclick="rejectOrder(${o.id})">Reject</button>
        </td>
      </tr>
    `;
  });
}

// Approve Order
function approveOrder(id) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let order = orders.find(o => o.id === id);
  if (order) {
    alert(`✅ Order #${id} approved for ${order.user}`);
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
  }
}

// Reject Order
function rejectOrder(id) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = orders.filter(o => o.id !== id);
  localStorage.setItem("orders", JSON.stringify(orders));
  alert(`❌ Order #${id} rejected`);
  loadOrders();
}

// Initialize
loadProducts();
loadOrders();
