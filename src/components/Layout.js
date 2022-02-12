import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import SideMenu from "./SideMenu";
import menu from "../images/menu.png";
import styled from "styled-components";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";

const LayoutStyle = styled.div`
  .menu-hamburger-img {
    width: 50px;
    height: 50px;
  }
  .menu-img:active {
    background-color: pink;
  }
  .menu-img:hover {
    background-color: pink;
  }
`;

export default function Layout() {
  const [menuCollapse, setMenuCollapse] = useState(false);

  return (
    <LayoutStyle>
      <div class="nav-icon4">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <SideMenu
        showMenu={menuCollapse}
        onClose={() => setMenuCollapse(!menuCollapse)}
      />
      {/* <button type="button" onClick={() => console.log("aaa")}>
        Menu */}
      {
        <img
          className="menu-hamburger-img"
          src={menu}
          alt="Menu button"
          onClick={() => setMenuCollapse(!menuCollapse)}
        ></img>
      }
      {/* </button> */}
      <Dashboard></Dashboard>
    </LayoutStyle>
  );
}
