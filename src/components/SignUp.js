import { useRef, Fragment, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import authFetch from "../modules/authFetch";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const createAccHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const API_KEY = "AIzaSyCgH-T7v3yiinVHooe9Fz48Uuk1L5kvgsc";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
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

    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );

    authCtx.login(
      data.idToken,
      expirationTime.toISOString(),
      data.localId,
      data.email
    );

    setLoading(false);
    navigate("/dashboard", { replace: true });
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
