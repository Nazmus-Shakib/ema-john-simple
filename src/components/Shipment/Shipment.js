import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../LogIn/useAuth";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data); // in future, we have to send data to database through it
  };

  const auth = useAuth();

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
