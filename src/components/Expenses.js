import React, { useContext } from "react";
import ExpensesContext from "../context/ExpensesContext";
import Expense from "./Expense";
import AuthContext from "../context/AuthContext";

const Expenses = (props) => {
  const expCtx = useContext(ExpensesContext);
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      {props.expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        props.expenses.map((expense) => (
          <Expense
            onDelete={expCtx.delete}
            key={expense.id}
            title={expense.title}
            cost={expense.cost}
            category={expense.category}
            month={expense.month}
            day={expense.day}
            year={expense.year}
            id={expense.id}
          />
        ))
      )}
    </React.Fragment>
  );
};
export default Expenses;
//onSave={editHandler}
