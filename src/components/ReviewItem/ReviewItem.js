import React from "react";

const ReviewItem = (props) => {
  //console.log(props);

  const { name, quantity, key, price } = props.product; // destructuring object (get the send data from Review.js component)
  const reviewItemStyle = {
    borderBottom: "1px solid lightgray",
    marginBottom: "10px",
    marginLeft: "50px",
    paddingBottom: "5px",
  };
  return (
    <div style={reviewItemStyle}>
      <h4>{name}</h4>
      <p>Quantity: {quantity}</p>
      <p>
        <small>Price: ${price}</small>
      </p>
      <br />
      <button className="main-button" onClick={() => props.removeProduct(key)}>
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
