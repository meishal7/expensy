import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import SideMenu from "./SideMenu";

export default function Layout() {
  return (
    <Fragment>
      <SideMenu />
      <Dashboard>
        <Outlet />
      </Dashboard>
    </Fragment>
  );
}
