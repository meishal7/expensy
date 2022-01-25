import { useRef, useContext, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import authFetch from "../modules/authFetch";

export default function LogIn(props) {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const logInHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const API_KEY = "AIzaSyCgH-T7v3yiinVHooe9Fz48Uuk1L5kvgsc";
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

    const fetchObj = {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await authFetch(url, API_KEY, fetchObj);

    //authCtx.storeId(data.localId);

    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );

    authCtx.login(data.idToken, expirationTime.toISOString(), data.localId);
    setLoading(false);
    navigate("/dashboard", { replace: true });
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
