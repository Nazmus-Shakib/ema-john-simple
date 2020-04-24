import React, { useContext, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

// for creating context hook
const AuthContext = createContext();
// create context provider
export const AuthContextProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // custom hook to call from all child components

// change path at review page either log in or process order
export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

// normal arrow function to get user identity
const getUser = (user) => {
  const { displayName, email, photoURL } = user;
  return {
    Name: displayName,
    Email: email,
    Photo: photoURL,
  };
};

const Auth = () => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const signedInUser = getUser(res.user);
        setUser(signedInUser);
        return res.user;
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        return err.message;
      });
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
        return true;
      })
      .catch(function (err) {
        console.log(err);
        return false;
      });
  };

  // to load data for current user
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (ur) {
      if (ur) {
        const currUser = getUser(ur);
        setUser(currUser);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  return { user, signInWithGoogle, signOut };
};

export default Auth;
