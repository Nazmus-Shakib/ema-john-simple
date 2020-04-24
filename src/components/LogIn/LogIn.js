import React from "react";
import Auth from "./useAuth";

const LogIn = () => {
  const auth = Auth();
  //console.log(auth);

  const handleSignIn = () => {
    auth.signInWithGoogle().then((res) => {
      //console.log("Redirect Now");
      window.location.pathname = "/review";
    });
  };

  const handleSignOut = () => {
    auth.signOut().then((res) => {
      window.location.pathname = "/shop";
    });
  };

  return (
    <div>
      <h1>Join the Party !!!</h1>
      {auth.user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default LogIn;
