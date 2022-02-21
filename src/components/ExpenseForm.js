import React, { useContext, useState } from "react";
import ErrorModal from "./ErrorModal";
import { format } from "date-fns";
import { categories } from "../categories/categories";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";

const NewExpenseFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  align-items: center;
  margin: auto auto auto auto;
  padding-top: 1em;
  padding-bottom: 1em;
  width: 90%;
  border-radius: 5px;
  background-color: #fbf7ff;

  label {
    display: block;
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
  input {
    background: #fbf7ff;
    width: 300px;
    /* width: 100%; */
    border-radius: 5px;
    height: 40px;
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
    justify-content: flex-end;
  }
  .form-buttons button {
    min-width: 100px;
    border-radius: 2px;
    background-color: none;
    border: 2px solid #eceaea;
    color: black;
    min-height: 30px;
    box-shadow: 2px 2px 5px #bdb7b7;
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
  /* .submit-btn:hover {
    color: pink;
  } */
  select {
    background: #fbf7ff;
    width: 100%;
    border-radius: 5px;
    line-height: 50;
    border: 2px solid #eceaea;
    background-color: #e6e3e8;
  }
  @media (min-width: 768px) {
    input {
      width: 500px;
    }
    /* width: 100%; */
  }
`;

const ExpenseForm = (props) => {
  const [title, setTitle] = useState(" ");
  const [cost, setCost] = useState(" ");
  const [date, setDate] = useState(" ");
  const [category, setCategory] = useState();
  const [error, setError] = useState();

  const authCtx = useContext(AuthContext);

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

  const submitHandler = (event) => {
    event.preventDefault();

    // Input validation
    if (title.trim().length === 0) {
      setError({
        title: "Invalid input.",
        message: "Please, enter the title.",
      });
      return;
    }
    if (+cost === 0 || cost < 0) {
      setError({
        title: "Invalid input.",
        message: "Please, enter the cost.",
      });
      return;
    }
    if (date.trim().length === 0) {
      setError({
        title: "Invalid input.",
        message: "Please, enter the date.",
      });
      return;
    }

    const expenseData = {
      title: title,
      date: date,

      year: +format(new Date(date), "yyyy"),
      month: format(new Date(date), "MMM"),
      // day: format(new Date(date), "dd"),
      cost: cost,
      category: category,
    };

    props.onSubmitNewExpense(expenseData, authCtx.token);
    setTitle("");
    setDate("");
    setCost("");
    setCategory("Choose Category");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <NewExpenseFormStyle>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
        />
      )}
      <form onSubmit={submitHandler}>
        {/* <div className="input-set"> */}
        <label htmlFor="expense-name">Title</label>
        <input
          className="input-area"
          type="text"
          id="expense-name"
          name="expense-name"
          placeholder="Title"
          value={title}
          onChange={titleHandler}
        />
        {/* </div> */}
        {/* <div className="input-set"> */}
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
        {/* </div> */}
        {/* <div className="input-set"> */}
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
        {/* </div> */}
        {/* <div className="input-set"> */}
        <label>Category</label>
        <select onChange={categoryHandler}>
          {categories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* </div> */}
        <div className="form-buttons">
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </NewExpenseFormStyle>
  );
};

export default ExpenseForm;
