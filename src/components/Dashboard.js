import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import Expenses from "./Expenses";
import React, { useState } from "react";
import YearFilter from "./YearFilter";
import Chart from "./Chart";

// const DUMMY_EXPENSES = [
//   {
//     id: Math.random() * 5,
//     title: "Surf1",
//     cost: 1000,
//     month: 1,
//     day: "01",
//     year: 2022,
//   },
//   {
//     id: Math.random() * 5,
//     title: "Surf1",
//     cost: 1000,
//     month: 1,
//     day: "01",
//     year: 2021,
//   },
//   {
//     id: Math.random() * 5,
//     title: "Surf1",
//     cost: 2000,
//     month: 1,
//     day: "01",
//     year: 2021,
//   },
//   {
//     id: Math.random() * 5,
//     title: "Surf1",
//     cost: 1000,
//     month: 2,
//     day: "01",
//     year: 2021,
//   },
//   {
//     id: Math.random() * 5,
//     title: "Surf1",
//     cost: 1000,
//     month: 11,
//     day: "01",
//     year: 2019,
//   },
//   {
//     id: Math.random() * 5,
//     title: "Surf1",
//     cost: 1000,
//     month: 12,
//     day: "01",
//     year: 2019,
//   },
//   {
//     id: Math.random() * 5,
//     title: "Surf1",
//     cost: 1000,
//     month: 12,
//     day: "01",
//     year: 2019,
//   },
// ];

export default function Dashboard({ children }) {
  // const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  // const [selectedYear, setYear] = useState(2022);
  // const [isEditingForm, setIsEditing] = useState(false);

  // const isEditingFormHandler = () => {
  //   setIsEditing(true);
  // };

  // const stopIsEditingFormHandler = () => {
  //   setIsEditing(false);
  // };

  // const submitExpenseHandler = (data) => {
  //   const expenseData = {
  //     ...data,
  //     id: Math.random().toString(),
  //   };
  //   setExpenses((prevExpenses) => [expenseData, ...prevExpenses]);
  //   setIsEditing(false);
  // };

  // const filteredExpenses = expenses.filter((expense) => {
  //   return expense.year === selectedYear;
  // });

  return (
    <Fragment>
      <div>This is dashboard.</div>

      {/* {!isEditingForm ? (
        <button onClick={isEditingFormHandler}>Add New Expense</button>
      ) : (
        <ExpenseForm
          onSubmitNewExpense={submitExpenseHandler}
          onCancel={stopIsEditingFormHandler}
        />
      )}

      <YearFilter onChangeYear={setYear} />
      <Chart expenses={filteredExpenses} />
      <Expenses expenses={filteredExpenses} /> */}
      <Outlet />
    </Fragment>
  );
}
