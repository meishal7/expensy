import React, { useContext } from "react";
import ExpensesContext from "../context/ExpensesContext";
import Expense from "./Expense";

const Expenses = (props) => {
  const expCtx = useContext(ExpensesContext);

  const deleteHandler = (id) => {
    expCtx.delete(id);
  };

  return (
    <React.Fragment>
      {props.expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        props.expenses.map((expense) => (
          <Expense
            onDelete={deleteHandler}
            key={expense.id}
            title={expense.title}
            cost={expense.cost}
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
