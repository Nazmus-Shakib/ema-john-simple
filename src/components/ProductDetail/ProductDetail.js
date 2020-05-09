import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams(); // we get the key no. of each product using useParams() React router hook. (we use to access one or more parameters from the path)
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(
      "https://ema-john-simple-by-shakib.herokuapp.com/product/" + productKey
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [productKey]);

  // const product = fakeData.find((pd) => pd.key === productKey); //used find method to get the specific key no from the fakeData array
  // console.log(product);

  return (
    <div>
      <h1> Selected Product Details: </h1>
      {product && <Product showAddToCart={false} product={product}></Product>}
    </div>
  );
};

export default ProductDetail;
