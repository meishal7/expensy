import React, { useState } from "react";
import ErrorModal from "./ErrorModal";
import { format } from "date-fns";
import { categories } from "../categories/categories";

const ExpenseForm = (props) => {
  const [title, setTitle] = useState(" ");
  const [cost, setCost] = useState(" ");
  const [date, setDate] = useState(" ");
  const [category, setCategory] = useState();
  const [error, setError] = useState();

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
      year: +format(new Date(date), "yyyy"),
      month: format(new Date(date), "MMM"),
      day: format(new Date(date), "dd"),
      cost: cost,
      category: category,
    };

    props.onSubmitNewExpense(expenseData);
    setTitle("");
    setDate("");
    setCost("");
    setCategory("Choose Category");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
        />
      )}
      <form onSubmit={submitHandler}>
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
          {categories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
};

export default ExpenseForm;
