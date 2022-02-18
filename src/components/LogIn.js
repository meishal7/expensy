import { useRef, useContext, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import BudgetContext from "../context/BudgetContext";
import authFetch from "../modules/authFetch";
import { ReactComponent as Logo } from "../images/logo.svg";
import styled from "styled-components";

const LogInStyle = styled.div`
  background: #3f3d40 0% 0% no-repeat padding-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .content {
    margin: auto auto auto auto;
    width: 70vw;
  }
  .form {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
    align-content: space-between;
  }
  label {
    color: #fbf7ff;
    opacity: 1;
  }
  input {
    background: #fbf7ff;
    width: 100%;
    border-radius: 5px;
    min-height: 30px;
    border: 0.5px #fbf7ff solid;
    /* -webkit-appearance: none;
    -moz-appearance: none; */
  }
  input:focus {
    outline: none;
    border: 2px #918e8e solid;
  }

  button {
    width: 100%;
    margin-top: 1em;
    min-height: 35px;
    font-family: inherit;
    /* -webkit-appearance: none;
    -moz-appearance: none; */
    border-radius: 5px;
    border: 0.5px #fbf7ff solid;
    background: #fbf7ff;
    font-family: inherit;
    color: #3f3d40;
    font-weight: 500;
    padding: 0 0;
  }
  .sign-in {
    background: #a976f7;
    color: aliceblue;
  }
  .sign-in:active {
    background: #7b2cf4;
  }
  .create-acc-btn:active {
    background: #8f8c91;
  }
  .field-set {
    margin-top: 1em;
  }
`;

export default function LogIn(props) {
  const authCtx = useContext(AuthContext);
  const budgCtx = useContext(BudgetContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const logInHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredEmail);
    localStorage.setItem("email", enteredEmail);

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

    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );

    authCtx.login(
      data.idToken,
      expirationTime.toISOString(),
      data.localId,
      data.email
    );

    const token = localStorage.getItem("token");

    budgCtx.getBudget(data.localId, token);

    setLoading(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <LogInStyle>
      <div className="content">
        <div>
          <Logo />
        </div>
        <div className="form">
          <form onSubmit={logInHandler}>
            <div className="field-set">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div className="field-set">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <button className="sign-in" type="submit">
              Sign In
            </button>
            <Link to="/sign-up">
              {" "}
              <button className="create-acc-btn" type="button">
                Create account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </LogInStyle>
  );
}
