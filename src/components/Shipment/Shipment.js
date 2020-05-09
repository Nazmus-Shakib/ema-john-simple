import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../LogIn/useAuth";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const auth = useAuth();

  const stripePromise = loadStripe(
    "pk_test_QsfONLaKpNdyz0cv97kEJHmi00zlsfcgmg"
  );

  const onSubmit = (data) => {
    setShipInfo(data);
    //console.log(data); // in future, we have to send data to database through it
  };

  const handlePlaceOrder = (payment) => {
    //TODO: Shakib move this after payment

    const savedCart = getDatabaseCart();
    const orderDetails = {
      email: auth.user.Email,
      cart: savedCart,
      shipment: shipInfo,
      payment: payment,
    };

    fetch("https://ema-john-simple-by-shakib.herokuapp.com/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((order) => {
        // from mongodb database
        setOrderId(order._id);
        processOrder(); // clear local shopping cart
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div style={{ display: shipInfo && "none" }} className="col-md-6">
          <h3>Shipment Information</h3>

          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="name"
              defaultValue={auth.user.Name}
              ref={register({ required: true })}
              placeholder="Name"
            />
            {errors.name && <span className="error">Name is required</span>}

            <input
              name="email"
              defaultValue={auth.user.Email}
              ref={register({ required: true })}
              placeholder="Email"
            />
            {errors.email && <span className="error">Email is required</span>}

            <input
              name="AddressLine1"
              ref={register({ required: true })}
              placeholder="Address Line 1"
            />
            {errors.AddressLine1 && (
              <span className="error">Address is required</span>
            )}

            <input
              name="AddressLine2"
              ref={register}
              placeholder="Address Line 2"
            />

            <input
              name="city"
              ref={register({ required: true })}
              placeholder="City"
            />
            {errors.city && <span className="error">City is required</span>}

            <input
              name="country"
              ref={register({ required: true })}
              placeholder="Country"
            />
            {errors.country && (
              <span className="error">Country is required</span>
            )}

            <input
              name="zipcode"
              ref={register({ required: true })}
              placeholder="ZipCode"
            />
            {errors.zipcode && (
              <span className="error">ZipCode is required</span>
            )}

            <input type="submit" />
          </form>
        </div>

        <div
          style={{
            marginTop: "200px",
            display: shipInfo ? "block" : "none",
          }}
          className="col-md-6"
        >
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
          </Elements>
          <br />
          {orderId && (
            <div>
              <h2>Thank you for shopping with us !!!</h2>
              <p>Your Order id is: {orderId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shipment;
