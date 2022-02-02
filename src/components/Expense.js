import React, { useState } from "react";
import ExpEditModal from "./ExpEditModal";

const Expense = ({ title, cost, month, day, year, id, onDelete }) => {
  const [editingExp, setEditing] = useState(false);

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
            setEditing(true);
          }}
        >
          Edit
        </button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
      {editingExp && (
        <ExpEditModal
          title={title}
          cost={cost}
          id={id}
          cancelEditing={setEditing}
        />
      )}
    </React.Fragment>
  );
};

export default Expense;
