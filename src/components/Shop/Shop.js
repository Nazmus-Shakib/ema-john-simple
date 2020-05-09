import React from "react";
import { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // to load data from mongodb database
  useEffect(() => {
    fetch("https://ema-john-simple-by-shakib.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    if (products.length > 0) {
      const previousCart = productKeys.map((existingKey) => {
        const product = products.find((pd) => pd.key === existingKey); //How will you get an object from an array of objects using an object property value
        product.quantity = savedCart[existingKey]; // savedCart is a object and we pass existing key to get quantity values
        return product;
      });

      setCart(previousCart);
    }
  }, [products]);

  const handleAddProduct = (product) => {
    // to store product (how much product) data in local storage and set quantity
    const productToBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === productToBeAddedKey);

    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;

      const otherProducts = cart.filter((pd) => pd.key !== productToBeAddedKey);
      newCart = [...otherProducts, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product]; // get previous cart items n add the new clicked products
    }

    setCart(newCart);
    addToDatabaseCart(product.key, count); // calling from databaseManager.js to store in local storage
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        {/* // send the dynamic data to Product.js  */}
        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pd}
          ></Product>
        ))}
      </div>

      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
