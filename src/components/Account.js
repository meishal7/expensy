import { Fragment, useContext, useState } from "react";
import BudgetEditModal from "./BudgetEditModal";
import BudgetContext from "../context/BudgetContext";
import EmailEditModal from "./EmailEditModal";
import editEmail from "../modules/editEmail";

export default function Account() {
  const email = localStorage.getItem("email");

  const budgCtx = useContext(BudgetContext);
  const [editingBudget, setEditingBudget] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  //const [pEmail, setEmail] = useState(email);

  return (
    <Fragment>
      <p>Email: {email} </p>

      <button type="button" onClick={() => setEditingEmail(true)}>
        Change Email
      </button>
      <p>Monthly Budget: ${budgCtx.budget} </p>
      <button type="button" onClick={() => setEditingBudget(true)}>
        Change Budget
      </button>
      {editingBudget && (
        <BudgetEditModal
          onSave={budgCtx.editBudget}
          onCancel={setEditingBudget}
          budget={budgCtx.budget}
        />
      )}

      {editingEmail && (
        <EmailEditModal
          onSave={editEmail}
          onCancel={setEditingEmail}
          email={email}
        />
      )}
    </Fragment>
  );
}
