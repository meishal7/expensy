import React from "react";

const Expense = ({ title, cost, month, day, year, id, onDelete }) => {
  onDelete(id);
  return (
    <React.Fragment>
      <div style={{ border: "black solid 1px" }}>
        <div>{title}</div>
        <div>{cost}</div>
        <div>{month}</div>
        <div>{day}</div>
        <div>{year}</div>

        <button>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </React.Fragment>
  );
};

export default Expense;
