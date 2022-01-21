import { useRef, useContext, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function LogIn() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logInHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgH-T7v3yiinVHooe9Fz48Uuk1L5kvgsc",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Authentication failed.");
      }
      const data = await res.json();
      //store id in context
      authCtx.storeId(data.localId);

      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      authCtx.login(data.idToken, expirationTime.toISOString());

      navigate("/dashboard", { replace: true });

      // retrieve db
      console.log();
      const dbData = await fetch(
        `https://expensy-db-default-rtdb.firebaseio.com/users/${authCtx.id}/expenses.json`,
        {
          method: "GET",
        }
      );

      const dbResponse = await dbData.json();
      console.log(dbResponse);

      const arr = Object.values(dbResponse);
      console.log(arr);

      //retrieve ends here
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