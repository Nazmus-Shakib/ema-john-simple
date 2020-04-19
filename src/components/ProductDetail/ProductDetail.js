import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams(); // we get the key no. of each product using useParams() React router hook. (we use to access one or more parameters from the path)

  const product = fakeData.find((pd) => pd.key === productKey); //used find method to get the specific key no from the fakeData array
  console.log(product);

  return (
    <div>
      <h1> Selected Product Details: </h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;