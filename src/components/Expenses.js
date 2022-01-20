import React from "react";
import Expense from "./Expense";
const Expenses = (props) => {
  return (
    <React.Fragment>
      {props.expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        props.expenses.map((expense) => (
          <Expense
            key={expense.id}
            title={expense.title}
            cost={expense.cost}
            month={expense.month}
            day={expense.day}
            year={expense.year}
          />
        ))
      )}
    </React.Fragment>
  );
};
export default Expenses;
