import { Link } from "react-router-dom";
import { Fragment } from "react";

export default function SideMenu() {
  return (
    <Fragment>
      <div>
        <Link to="/account">Account</Link>
        <Link to="/budget">Budget</Link>
        <Link to="/dashboard">Expenses</Link>
        <Link to="/dashboard/add-expense">Add Expense</Link>
      </div>
      <div>Expenses logo here</div>
    </Fragment>
  );
}
