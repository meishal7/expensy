import { useRef, Fragment, useState, useContext } from "react";
import { Link, useNavigate, Navigate, location } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Layout from "./Layout";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const createAccHandler = async (event) => {
    event.preventDefault();
    //setLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const token = "Token";

    authCtx.login("TOKEN");
    localStorage.setItem("token", "TOKEN");
    //console.log(!!authCtx.token);
    navigate("/dashboard", { replace: true });
    // try {
    //   const res = await fetch(
    //     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgH-T7v3yiinVHooe9Fz48Uuk1L5kvgsc",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         email: enteredEmail,
    //         password: enteredPassword,
    //         returnSecureToken: true,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!res.ok) {
    //     const { error } = await res.json();
    //     console.log(error.message);
    //     throw new Error(error.message);
    //   }
    //   const data = await res.json();
    //   console.log(data);
    //   console.log("Account was created!");
    // } catch (error) {
    //   console.log(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Fragment>
      <p>This is Welcome Sign up page</p>
      <form onSubmit={createAccHandler}>
        <div>
          <label htmlFor="email">Enter Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          <button disabled={loading} type="submit">
            Create account
          </button>
        </div>
      </form>
      <Link to="/log-in">Sign in with existing account</Link>
    </Fragment>
  );
}
