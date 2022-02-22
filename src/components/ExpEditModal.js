import styled from "styled-components";
import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { format } from "date-fns";
import ExpensesContext from "../context/ExpensesContext";
import AuthContext from "../context/AuthContext";

const ModalStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: #0d0d0de8;
  z-index: 99;
`;

const EditModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  align-items: center;
  margin: 5em auto auto auto;
  padding-top: 1em;
  padding-bottom: 1em;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #fbf7ff;
  width: 90%;

  label {
    display: block;
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
  input {
    background: #fbf7ff;
    min-width: 300px;
    /* width: 100%; */
    border-radius: 5px;
    min-height: 40px;
    border: 2px solid #eceaea;
    background-color: #e6e3e8;
  }
  input:focus {
    border: 2px solid #b5afaf;
  }

  .form-buttons {
    margin-top: 1em;
    display: flex;
    align-items: center;
  }
  .form-buttons button {
    min-width: 100px;
    border-radius: 2px;
    background-color: none;
    border: 2px solid var(--color-primary);
    color: black;
    min-height: 30px;
    flex: 1;
  }
  .form-buttons button:hover {
    background-color: #b58ef2;
  }
  .form-buttons button:active {
    background-color: #a976f7;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .submit-btn {
    margin-left: 1em;
    background-color: none;
  }
  .submit-btn:hover {
    color: black;
    background-color: #b58ef2;
  }
  select {
    background: #fbf7ff;
    width: 100%;
    border-radius: 5px;
    line-height: 50;
    border: 2px solid #eceaea;
    background-color: #e6e3e8;
  }
  @media (min-width: 768px) {
    position: absolute;
    z-index: 5;
    border: 1px solid black;
    width: 70%;
    align: center;
    /* margin: 10em 10em; */
  }
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
  const [category, setCategory] = useState("Choose Category");

  const expCtx = useContext(ExpensesContext);
  const authCtx = useContext(AuthContext);

  //const token = localStorage.getItem("token");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const costHandler = (event) => {
    setCost(event.target.value);
  };

  const dateHandler = (event) => {
    setDate(event.target.value);
  };

  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalStyle>
          <EditModalStyle>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                console.log(authCtx.token);

                const changedData = {
                  title: title,
                  year: +format(new Date(date), "yyyy"),
                  month: format(new Date(date), "MMM"),
                  day: format(new Date(date), "dd"),
                  cost: cost,
                  category: category,
                  id: id,
                };

                expCtx.editExp(authCtx.userId, changedData, authCtx.token);

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
              <label>Category</label>
              <select onChange={categoryHandler}>
                <option value="Choose ategory">Choose Category</option>
                <option value="Choose ategory">Other</option>
                <option value="Home insurance">Home Insurance</option>
                <option value="Auto insurance">Auto Insurance</option>
                <option value="Health insurance">Auto Insurance</option>
                <option value="Water bill">Water Bill</option>
                <option value="Garbage bill">Garbage Bill</option>
                <option value="Groceries">Groceries</option>
                <option value="Car payment">Car Payment</option>
                <option value="Internet">Internet</option>
                <option value="Child care">Child Care</option>
                <option value="Clothes">Clothes</option>
                <option value="Furniture">Furniture</option>
                <option value="Home appliance">Home Appliance</option>
                <option value="Rent">Reant/Morgage</option>
                <option value="Gasoline">Gasoline</option>
              </select>
              <div className="form-buttons">
                <button type="button" onClick={() => cancelEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </EditModalStyle>
        </ModalStyle>,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default ExpEditModal;
