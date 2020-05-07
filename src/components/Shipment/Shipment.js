import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../LogIn/useAuth";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const auth = useAuth();

  const onSubmit = (data) => {
    //console.log(data); // in future, we have to send data to database through it
    //TODO: Shakib move this after payment

    const savedCart = getDatabaseCart();
    const orderDetails = { email: auth.user.Email, cart: savedCart };

    fetch("http://localhost:3001/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Order Placed", data);
        alert("Order Placed Successfully with order Id: " + data._id);
        processOrder();
      });
  };

  return (
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

      <input name="AddressLine2" ref={register} placeholder="Address Line 2" />

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
      {errors.country && <span className="error">Country is required</span>}

      <input
        name="zipcode"
        ref={register({ required: true })}
        placeholder="ZipCode"
      />
      {errors.zipcode && <span className="error">ZipCode is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
