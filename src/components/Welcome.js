import { useRef, Fragment } from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const createAccHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    try {
    } catch (err) {}
    fetch(
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
    ).then((res) => {
      if (res.ok) {
        console.log("create acc is ok");
        console.log(res.json());
      } else {
        return res.json().then((data) => {
          let errorMessage = "Authentication failed.";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        });
      }
    });
  };

  return (
    <Fragment>
      <p>This is Welcome page</p>
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
          <button type="submit">Create account</button>
        </div>
      </form>
      <Link to="/sign-in">Sign in with existing account</Link>
    </Fragment>
  );
}
