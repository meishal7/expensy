import styled from "styled-components";
import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import BudgetContext from "../context/BudgetContext";

const EditModalStyle = styled.div`
  border: 1px solid black;
  position: absolute;
  background: pink;
`;

const BudgetEditModal = ({ budget: pbudget, onSave, onCancel }) => {
  const budgCtx = useContext(BudgetContext);
  const [budget, setBudget] = useState(pbudget);
  const userId = localStorage.getItem("userId");

  const budgetHandler = (event) => {
    setBudget(event.target.value);
  };

  return (
    <EditModalStyle>
      {ReactDOM.createPortal(
        <div>
          <form>
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

            <button
              type="button"
              onClick={() => {
                onSave(userId, budget);
                onCancel(false);
              }}
            >
              Save
            </button>
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
