import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";

const SideMenuStyle = styled.div`
border: black solid 
`

export default function SideMenu() {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <div>
        <p>This is side menu.</p>
        <Link to="/dashboard/account">Account</Link>
        <br></br>
        <Link to="/dashboard/budget">Budget</Link>
        <br></br>
        <Link to="/dashboard">Expenses</Link>
        <br></br>
      </div>
      <button onClick={authCtx.logout}>Log Out</button>
    </Fragment>
  );
}
