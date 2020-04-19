import React, { useEffect } from "react";
import { useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import happyImage from "../../images/giphy.gif";

const Review = () => {
  // to get data from or manage cart.js
  const [cart, setCart] = useState([]);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
  };

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

    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key); // to find the key property values of the selected items in local storage (also counts the repetition of selected items)
      product.quantity = savedCart[key]; // to add quantity attribute inside the product array and show the repetition of the items
      return product;
    });

    setCart(cartProducts);
  }, []);

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt="" />;
  }

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

        {thankYou}
      </div>

      <div className="cart-container">
        <Cart cart={cart}>
          <button className="main-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
