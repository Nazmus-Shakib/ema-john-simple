import React, { useEffect } from "react";
import { useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import { useAuth } from "../LogIn/useAuth";

const Review = () => {
  // to get data from or manage cart.js
  const [cart, setCart] = useState([]);

  const auth = useAuth(); // calling custom hook from UseAuth

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey); // filter out only those products that is not selected
    setCart(newCart); // remove from website

    removeFromDatabaseCart(productKey); // remove from local storage (or database)
  };

  // load data from databaseManager.js
  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart); // to find the selected items key property addresses that is stored in local storage.  (we can also use object.values to get key property values)

    fetch("https://ema-john-simple-by-shakib.herokuapp.com/getProductsByKey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => {
        const cartProducts = productKeys.map((key) => {
          const product = data.find((pd) => pd.key === key); // to find the key property values of the selected items in local storage (also counts the repetition of selected items)
          product.quantity = savedCart[key]; // to add quantity attribute inside the product array and show the repetition of the items
          return product;
        });

        setCart(cartProducts);
      });
  }, []);

  return (
    <div className="twin-container">
      {/* <h1>Cart Items: {cart.length}</h1> */}

      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            product={pd}
            removeProduct={removeProduct}
          ></ReviewItem>
        ))}

        {!cart.length && (
          <h1>
            Your Cart is Empty!!! <a href="/shop">Keep Shopping</a>
          </h1>
        )}
      </div>

      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/shipment">
            {auth.user ? (
              <button className="main-button">Proceed Checkout</button>
            ) : (
              <button className="main-button">Log In to Proceed</button>
            )}
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
