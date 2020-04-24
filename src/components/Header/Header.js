import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { useAuth } from "../LogIn/useAuth";

// // custom hook
// const usePrevious = (value) => {
//   const prev = useRef();

//   useEffect(() => {
//     prev.current = value;
//     console.log(value);
//   }, [value]);
//   return prev.current;
// };

const Header = () => {
  const auth = useAuth();
  //console.log(auth);

  //   const [count, setCount] = useState(0);
  //   const previous = usePrevious(count);

  return (
    <div className="header">
      {/* <h1>
        Count:{count} Previous:{previous}
      </h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button> */}

      <img src={logo} alt="" />
      <nav>
        <a href="/shop">Shop </a>
        <a href="/review">Order Review</a>
        <a href="/inventory">Manage Inventory</a>

        {auth.user && (
          <span style={{ color: "yellow" }}> Welcome {auth.user.Name}</span>
        )}

        {auth.user ? (
          <a href="/login" style={{ marginLeft: "30px" }}>
            Sign Out
          </a>
        ) : (
          <a href="/login">Sign In</a>
        )}
      </nav>
    </div>
  );
};

export default Header;
