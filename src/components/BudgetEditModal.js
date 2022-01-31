import styled from "styled-components";
import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import ExpensesContext from "../context/ExpensesContext";
import { getDaysInMonth } from "date-fns";

const EditModalStyle = styled.div`
  border: 1px solid black;
  position: absolute;
  background: pink;
`;

const BudgetEditModal = ({ budget: pBudget, onSave, onCancel }) => {
  const expCtx = useContext(ExpensesContext);
  const [budget, setBudget] = useState(pBudget);

  const budgetHandler = (event) => {
    setBudget(event.target.value);
  };

  return (
    <EditModalStyle>
      {ReactDOM.createPortal(
        <div>
          <form>
            <label htmlFor="budget">Cost</label>
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
                localStorage.setItem("budget", budget);
                onSave(budget);
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
