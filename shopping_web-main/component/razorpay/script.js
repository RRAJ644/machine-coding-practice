
let totalPay= JSON.parse(localStorage.getItem('totalPay'));
let cart=
console.log(totalPay);
document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_KzC8tI0DjNcjSD",
    amount: totalPay * 100,
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order",
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  e.preventDefault();
};
