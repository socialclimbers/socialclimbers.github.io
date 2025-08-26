// js/main.js
// Shared JS: small utilities, cart count & year stamps

// Set current year across pages
document.querySelectorAll('.year').forEach(el=>{
  el.textContent = new Date().getFullYear();
});


// Minimal cart (prototype) using localStorage
(function(){
  if(!localStorage.getItem('sc_cart')) localStorage.setItem('sc_cart', JSON.stringify([]));
  updateCartCount();
})();


function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  let cart = JSON.parse(localStorage.getItem('sc_cart') || '[]');

  const existing = cart.find(item => item.name === product.name);
  if(existing) {
    existing.qty += 1;
  } else {
    cart.push({name: product.name, price: product.price, qty: 1});
  }

  localStorage.setItem('sc_cart', JSON.stringify(cart));
  updateCartCount();
  showCartToast(`${product.name} added to cart.`);
}

function addServiceToCart(serviceName, price) {
  let cart = JSON.parse(localStorage.getItem('sc_cart') || '[]');

  const existing = cart.find(item => item.name === serviceName);
  if(existing) {
    existing.qty += 1;
  } else {
    cart.push({name: serviceName, price: price, qty: 1});
  }

  localStorage.setItem('sc_cart', JSON.stringify(cart));
  updateCartCount();
  showCartToast(`${serviceName} added to cart.`);
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('sc_cart') || '[]');
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount,#cartCount2').forEach(e=>{
    if(e) e.textContent = totalQty;
  });
}

function showCartToast(message) {
  const toastEl = document.getElementById('cartToast');
  const toastBody = document.getElementById('cartToastBody');
  toastBody.textContent = message;

  const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
  toast.show();
}
