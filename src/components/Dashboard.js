import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import React from "react";

export default function Dashboard({ children }) {
  return (
    <Fragment>
      <div>This is dashboard.</div>

      {}
      <Outlet />
    </Fragment>
  );
}
