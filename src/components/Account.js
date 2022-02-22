import { Fragment, useContext, useState } from "react";
import BudgetEditModal from "./BudgetEditModal";
import BudgetContext from "../context/BudgetContext";
import CredentialsContext from "../context/CredentialsContext";
import EmailEditModal from "./EmailEditModal";
import PasswEditModal from "./PasswEditModal";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";

const AccountStyle = styled.div`
  width: 100%;
  margin-left: 3em;
  margin-top: 2em;
  span {
    font-weight: bold;
  }
  .change-btn {
    height: 30px;
    border: 1px solid black;
    display: block;
  }
  input {
    border: none;
    background: #fbf7ff 0% 0% no-repeat padding-box;
  }
  input:hover {
    cursor: pointer;
    border: 1px solid black;
  }
  input:focus {
    border: 1px solid black;
  }
  fieldset {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
    border: none;
  }
`;

export default function Account({ onCancel }) {
  const email = localStorage.getItem("email");

  const budgCtx = useContext(BudgetContext);
  const credCtx = useContext(CredentialsContext);
  const authCtx = useContext(AuthContext);

  const [pemail, setEmail] = useState(email);
  const [password, setPassword] = useState("******");
  const [budget, setBudget] = useState(budgCtx.budget);

  const [editingBudget, setEditingBudget] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassw, setEditingPassw] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <AccountStyle>
      <span>ACCOUNT</span>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const newData = {
            idToken: authCtx.token,
            email: pemail,
            returnSecureToken: true,
          };

          credCtx.changeCredential(newData, API_KEY);
        }}
      >
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder=""
            value={pemail}
            onChange={emailHandler}
          />
        </fieldset>
        <button className="change-btn" type="submit" value="Submit">
          Save
        </button>
      </form>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          const newData = {
            idToken: authCtx.token,
            password: password,
            returnSecureToken: true,
          };

          credCtx.changeCredential(newData, API_KEY);
          onCancel(false);
        }}
      >
        <fieldset>
          <label htmlFor="Password(6 characters minimum):">
            Password(6 characters minimum)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            minLength="6"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </fieldset>
        <button className="change-btn" type="submit" value="Submit">
          Save
        </button>
      </form>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          //onSave(userId, budget);

          budgCtx.editBudget(authCtx.userId, budget, authCtx.token);

          onCancel(false);
        }}
      >
        <fieldset>
          <label htmlFor="budget">Budget:</label>
          <input
            type="number"
            id="budget"
            name="budget"
            placeholder="00.00"
            value={budget}
            step="1"
            onChange={(event) => setBudget(event.target.value)}
          />
        </fieldset>
        <button className="change-btn" type="submit" value="Submit">
          Save
        </button>
      </form>

      {editingBudget && (
        <BudgetEditModal
          //onSave={budgCtx.editBudget}
          onCancel={setEditingBudget}
          budget={budgCtx.budget}
        />
      )}

      {editingEmail && (
        <EmailEditModal
          onSave={credCtx.changeCredential}
          onCancel={setEditingEmail}
          email={email}
        />
      )}
      {editingPassw && (
        <PasswEditModal
          onSave={credCtx.changeCredential}
          onCancel={setEditingPassw}
          email={email}
        />
      )}
    </AccountStyle>
  );
}
