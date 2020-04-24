import React from "react";

const Cart = (props) => {
  const cart = props.cart;

  //const total = cart.reduce((total, prd) => total + prd.price, 0);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quantity;
  }

  let shipping = 0;
  if (total > 50) {
    shipping = 0;
  } else if (total > 30) {
    shipping = 6.99;
  } else if (total > 15) {
    shipping = 10.99;
  }

  const tax = (total / 10).toFixed(2);
  const total1 = Number(total).toFixed(2);
  const grandTotal = (total + shipping + Number(tax)).toFixed(2);

  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items Ordered: {cart.length}</p>
      <p>Product Price: {total1}</p>
      <p>
        <small>Shipping Cost: {shipping}</small>
      </p>
      <p>
        <small>Tax: {tax}</small>
      </p>
      <p>Total Price: {grandTotal}</p>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
