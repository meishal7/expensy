import { useRef, Fragment, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import createUser from "../modules/createUser.js";

export default function SignUp() {
  const API_KEY = "AIzaSyCgH-T7v3yiinVHooe9Fz48Uuk1L5kvgsc";

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

    try {
      const res = await createUser(API_KEY, enteredEmail, enteredPassword);
      if (!res.ok) {
        const { error } = await res.json();
        console.log(error.message);
        throw new Error(error.message);
      }
      const data = await res.json();
      console.log(data);

      authCtx.storeId(data.localId);

      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );

      authCtx.login(data.idToken, expirationTime.toISOString());
      navigate("/dashboard", { replace: true });
      console.log(authCtx.id);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
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
