import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";

const Product = (props) => {
  //console.log(props);
  const { img, name, seller, price, stock } = props.product;
  return (
    // access data that is sent from shop.js
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>

      <div className="product-name">
        <h4>{name}</h4>
        <br />
        <p>
          <small>by: {seller}</small>
        </p>
        <p>$ {price}</p>
        <br />
        <p>
          <small>Only {stock} left in stock - Order soon</small>
        </p>
        <button
          className="main-button"
          onClick={() => props.handleAddProduct(props.product)} //to maintain click handler, we need to declare a arrow function with null parameter to avoid automatic execute, when we have to pass props.element as parameter
        >
          <FontAwesomeIcon icon={faShoppingCart} /> add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
