import React, { useContext } from "react";
import ExpensesContext from "../context/ExpensesContext";
import Expense from "./Expense";


const Expenses = (props) => {
  const expCtx = useContext(ExpensesContext);

  return (
    <React.Fragment>
      {props.expenses.length === 0 ? (
        <p style={{ paddingLeft: "1em" }}>No expenses found.</p>
      ) : (
        props.expenses.map((expense) => (
          <Expense
            onDelete={expCtx.delete}
            key={expense.id}
            title={expense.title}
            date={expense.date}
            cost={expense.cost}
            category={expense.category}
            month={expense.month}
            year={expense.year}
            id={expense.id}
          />
        ))
      )}
    </React.Fragment>
  );
};
export default Expenses;

