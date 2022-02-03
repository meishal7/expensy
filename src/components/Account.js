import { Fragment, useContext, useState } from "react";
import BudgetEditModal from "./BudgetEditModal";
import BudgetContext from "../context/BudgetContext";
import CredentialsContext from "../context/CredentialsContext";
import EmailEditModal from "./EmailEditModal";
import PasswEditModal from "./PasswEditModal";

export default function Account() {
  const email = localStorage.getItem("email");

  const budgCtx = useContext(BudgetContext);
  const credCtx = useContext(CredentialsContext);

  const [editingBudget, setEditingBudget] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassw, setEditingPassw] = useState(false);

  return (
    <Fragment>
      <p>Email: {credCtx.email} </p>
      <button type="button" onClick={() => setEditingEmail(true)}>
        Change Email
      </button>

      <p>Password: {credCtx.password} </p>
      <button type="button" onClick={() => setEditingPassw(true)}>
        Change Password
      </button>

      <p>Monthly Budget: ${budgCtx.budget} </p>
      <button type="button" onClick={() => setEditingBudget(true)}>
        Change Budget
      </button>

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
    </Fragment>
  );
}
