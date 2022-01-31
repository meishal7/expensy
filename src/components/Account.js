import { Fragment, useState } from "react";
import BudgetEditModal from "./BudgetEditModal";

export default function Account() {
  let num = 0.0;
  let defBudget = num.toFixed(2);

  const email = localStorage.getItem("email");

  const [editing, setEditing] = useState(false);
  const [budget, setBudget] = useState(defBudget);
  const [pEmail, setEmail] = useState(email);

  return (
    <Fragment>
      <p>Email: {email} </p> <button>Change Email</button>
      <p>Monthly Budget: {budget} </p>
      <button type="button" onClick={() => setEditing(true)}>
        Change Budget
      </button>
      {editing && <BudgetEditModal onSave={setBudget} onCancel={setEditing} />}
    </Fragment>
  );
}
