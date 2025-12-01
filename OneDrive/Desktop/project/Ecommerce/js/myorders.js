// myorders.js
// Display user's orders from localStorage

document.addEventListener("DOMContentLoaded", function () {
  const ordersContainer = document.getElementById("orders-container");
  let orders = JSON.parse(localStorage.getItem("orders"));

  if (orders.length === 0) {
    ordersContainer.innerHTML = '<p style="text-align:center;width:100%;color:#888;font-size:1.2rem;">No orders found.</p>';
    return;
  }
  console.log(orders);

  orders.forEach((order) => {
    const div = document.createElement("div");
    div.className = "order-card";
    div.innerHTML = `
      <img src="${order.image || "https://via.placeholder.com/110"}" alt="${order.product || "Product"}" />
      <div class="order-title">${order.title || "Product"}</div>
      <div class="order-amount">Amount: ₹${(order.quantity?order.quantity:1)*(order.price*80)}</div>
      <div class="order-date">Date: ${order.date}</div>
      <div class="order-paymentid">Payment ID: ${order.paymentId}</div>
      <div class="order-price">Order Placed</div>
    `;
    ordersContainer.appendChild(div);
  });
});
