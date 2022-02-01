import { Fragment, useContext, useState } from "react";
import BudgetEditModal from "./BudgetEditModal";
import BudgetContext from "../context/BudgetContext";

export default function Account() {
  const email = localStorage.getItem("email");

  const budgCtx = useContext(BudgetContext);
  const [editing, setEditing] = useState(false);
  const [pEmail, setEmail] = useState(email);
  console.log(email);
  // console.log(budgCtx.budget) = {budget: }; 
  return (
    <Fragment>
      <p>Email: {email} </p> <button>Change Email</button>
      <p>Monthly Budget: ${budgCtx.budget.budget} </p>
      <button type="button" onClick={() => setEditing(true)}>
        Change Budget
      </button>
      {editing && (
        <BudgetEditModal onSave={budgCtx.editBudget} onCancel={setEditing} />
      )}
    </Fragment>
  );
}
