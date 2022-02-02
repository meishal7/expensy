import styled from "styled-components";
import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { format } from "date-fns";
import ExpensesContext from "../context/ExpensesContext";

const EditModalStyle = styled.div`
  border: 1px solid black;
  position: absolute;
  background: pink;
`;

const ExpEditModal = ({
  title: ptitle,
  cost: pcost,
  saveChanges,
  cancelEditing,
  id,
}) => {
  const [title, setTitle] = useState(ptitle);
  const [cost, setCost] = useState(pcost);
  const [date, setDate] = useState(" ");

  const expCtx = useContext(ExpensesContext);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const costHandler = (event) => {
    setCost(event.target.value);
  };

  const dateHandler = (event) => {
    setDate(event.target.value);
  };

  return (
    <EditModalStyle>
      {ReactDOM.createPortal(
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const changedData = {
                title: title,
                year: +format(new Date(date), "yyyy"),
                month: format(new Date(date), "MMM"),
                day: format(new Date(date), "dd"),
                cost: cost,
                id: id,
              };

              expCtx.editExp(changedData);

              cancelEditing(false);
            }}
          >
            <label htmlFor="expense-name">Title</label>
            <input
              type="text"
              id="expense-name"
              name="expense-name"
              placeholder="Title"
              value={title}
              onChange={titleHandler}
            />
            <label htmlFor="expense-cost">Cost</label>
            <input
              type="number"
              id="expense-cost"
              name="expense-cost"
              placeholder="00.00"
              value={cost}
              step="1"
              onChange={costHandler}
            />
            <label htmlFor="expense-date">Date</label>
            <input
              type="date"
              min="2019-01-01"
              max="2119-01-01"
              id="expense-date"
              name="expense-date"
              placeholder=" "
              value={date}
              onChange={dateHandler}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => cancelEditing(false)}>
              Cancel
            </button>
          </form>
        </div>,
        document.getElementById("edit-exp-modal-root")
      )}
    </EditModalStyle>
  );
};

export default ExpEditModal;
