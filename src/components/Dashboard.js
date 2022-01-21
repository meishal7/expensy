import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import Expenses from "./Expenses";
import React, { useState } from "react";
import YearFilter from "./YearFilter";
import Chart from "./Chart";

export default function Dashboard({ children }) {
  return (
    <Fragment>
      <div>This is dashboard.</div>

      {}
      <Outlet />
    </Fragment>
  );
}
