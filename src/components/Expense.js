import React from "react";

const Expense = ({ title, cost, month, day, year, id, onDelete, onEdit }) => {
  return (
    <React.Fragment>
      <div style={{ border: "black solid 1px" }}>
        <div>{title}</div>
        <div>{cost}</div>
        <div>{month}</div>
        <div>{day}</div>
        <div>{year}</div>

        <button
          onClick={() => {
            const expData = {
              title: title,
              cost: cost,
              id: id,
            };
            onEdit(expData);
          }}
        >
          Edit
        </button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </React.Fragment>
  );
};

export default Expense;
