import styled from "styled-components";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const EditModalStyle = styled.div`
  border: 1px solid black;
  position: absolute;
  background: pink;
`;

const BudgetEditModal = ({ budget: defbudget, onSave, onCancel }) => {
  const [budget, setBudget] = useState(defbudget);
  const userId = localStorage.getItem("userId");

  const budgetHandler = (event) => {
    setBudget(event.target.value);
  };

  return (
    <EditModalStyle>
      {ReactDOM.createPortal(
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSave(userId, budget);
              onCancel(false);
            }}
          >
            <label htmlFor="budget">Budget</label>
            <input
              type="number"
              id="budget"
              name="budget"
              placeholder="00.00"
              value={budget}
              step="1"
              onChange={budgetHandler}
            />

            <button type="submit">Save</button>
            <button type="button" onClick={() => onCancel(false)}>
              Cancel
            </button>
          </form>
        </div>,
        document.getElementById("edit-budget-modal-root")
      )}
    </EditModalStyle>
  );
};

export default BudgetEditModal;
