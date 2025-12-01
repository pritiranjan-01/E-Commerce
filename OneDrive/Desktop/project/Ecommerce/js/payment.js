const paynowBtn = document.getElementById("pay-btn");

document.addEventListener("DOMContentLoaded", function () {
  const paymentData = JSON.parse(sessionStorage.getItem("paymentData"));
  const amountDisplay = document.getElementById("amount-display");
  const payBtn = document.getElementById("pay-btn");


  let amount = undefined;
  if (paymentData) {
    amount = Math.round((paymentData.quantity ? paymentData.quantity : 1) * (paymentData.price * 80));
    amountDisplay.innerText= "₹ " + amount;
  } else {
    amountDisplay.textContent = "No amount found.";
    document.getElementById("pay-btn").disabled = true;
  }

  console.log(amount);

  payBtn.addEventListener("click", function () {
    // Razorpay options
    var options = {
      key: "rzp_test_R81NAofbc1zp4E", // Replace with your Razorpay Key ID
      amount: amount * 100, // Amount is in paise
      currency: "INR",
      name: "Pritiranjan Shop",
      description: paymentData.product || "Product Payment",
      image: paymentData.image || undefined,
      handler: function (response) {
        // Payment successful
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // add a parameter to localStorage of paymentData as its rewuired for Showing in My order page
        paymentData.paymentId = response.razorpay_payment_id;
        paymentData.date = new Date().toLocaleDateString();
        console.log(paymentData);
        let existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        console.log(existingOrders);
        existingOrders.push(paymentData);
        localStorage.setItem("orders", JSON.stringify(existingOrders));
        window.location.href = "./myorders.html";
      },
      prefill: {
        name: paymentData.name || "",
        email: paymentData.email || "",
      },
      theme: {
        color: "#cf9522ff",
      },
    };
    var rzp = new Razorpay(options);
    rzp.open();
  });
});

