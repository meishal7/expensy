import { Fragment, useContext, useState } from "react";
import BudgetEditModal from "./BudgetEditModal";
import BudgetContext from "../context/BudgetContext";
import CredentialsContext from "../context/CredentialsContext";
import EmailEditModal from "./EmailEditModal";
import PasswEditModal from "./PasswEditModal";
import styled from "styled-components";

const AccountStyle = styled.div`
  width: 100vw;
  margin-left: 3em;
  margin-top: 2em;
  span {
    font-weight: bold;
  }
  button {
    border: 0.5px solid black;
    width: 170px;
    height: 30px;
    color: #e34bb9;

    border-radius: 2px;
    background-color: none;
    border: 2px solid #eceaea;
    color: black;

    box-shadow: 2px 2px 5px #bdb7b7;
  }
  .set {
    display: flex;
  }
`;

export default function Account() {
  const email = localStorage.getItem("email");

  const budgCtx = useContext(BudgetContext);
  const credCtx = useContext(CredentialsContext);

  const [editingBudget, setEditingBudget] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassw, setEditingPassw] = useState(false);

  return (
    <AccountStyle>
      <span>ACCOUNT</span>
      {/* <div className="set"> */}
      <p>Email: {credCtx.email} </p>
      <button
        className="change-btn"
        type="button"
        onClick={() => setEditingEmail(true)}
      >
        Change Email
      </button>
      {/* </div> */}
      {/* <div className="set"> */}
      <p>Password: {credCtx.password} </p>
      <button type="button" onClick={() => setEditingPassw(true)}>
        Change Password
      </button>
      {/* </div> */}
      {/* <div className="set"> */}
      <p>Monthly Budget: ${budgCtx.budget} </p>
      <button type="button" onClick={() => setEditingBudget(true)}>
        Change Budget
      </button>
      {/* </div> */}

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
