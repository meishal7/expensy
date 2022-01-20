import React from "react";
const Expense = (props) => {
  return (
    <React.Fragment>
      <div style={{ border: "black solid 1px" }}>
        <div>{props.title}</div>
        <div>{props.cost}</div>
        <div>{props.month}</div>
        <div>{props.day}</div>
        <div>{props.year}</div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </React.Fragment>
  );
};

export default Expense;
