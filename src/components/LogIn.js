import { useRef, useContext, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import getExpenses from "../modules/getExpenses";
import loginUser from "../modules/loginUser";

export default function LogIn(props) {
  const API_KEY = "AIzaSyCgH-T7v3yiinVHooe9Fz48Uuk1L5kvgsc";

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logInHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const res = await loginUser(API_KEY, enteredEmail, enteredPassword);

      if (!res.ok) {
        throw new Error("Authentication failed.");
      }
      const data = await res.json();
      authCtx.storeId(data.localId);

      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );

      authCtx.login(data.idToken, expirationTime.toISOString(), data.localId);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <p>This is Sign in page</p>
      <form onSubmit={logInHandler}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
      <Link to="/sign-up">Create account</Link>
    </Fragment>
  );
}
