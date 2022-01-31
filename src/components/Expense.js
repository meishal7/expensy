import React, { useContext, useState } from "react";
import ExpensesContext from "../context/ExpensesContext";
import EditModal from "./ExpEditModal";

const Expense = ({ title, cost, month, day, year, id, onDelete, onEdit }) => {
  const [editingExp, setEditing] = useState(false);
  const expCtx = useContext(ExpensesContext);

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
          // onClick={() => {
          //   const expData = {
          //     title: title,
          //     cost: cost,
          //     id: id,
          //   };
          //   onEdit(expData);
          // }}
        >
          Edit
        </button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
      {editingExp && (
        <EditModal
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
