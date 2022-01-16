import { useRef, Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const createAccHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgH-T7v3yiinVHooe9Fz48Uuk1L5kvgsc",
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
        const { error } = await res.json();
        console.log(error.message);
        throw new Error(error.message);
      }
      const data = await res.json();
      console.log(data);
      console.log("Account was created!");
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
      <Link to="/sign-in">Sign in with existing account</Link>
    </Fragment>
  );
}
