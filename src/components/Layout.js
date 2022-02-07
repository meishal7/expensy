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

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <LayoutStyle>
      
      {!menuCollapse && <SideMenu onClose={menuIconClick} />}

      {/* <button type="button" onClick={() => console.log("aaa")}>
        Menu */}
      {
        <img
          className="menu-hamburger-img"
          src={menu}
          alt="Menu button"
          onClick={menuIconClick}
        ></img>
      }
      {/* </button> */}
      <Dashboard></Dashboard>
    </LayoutStyle>
  );
}
