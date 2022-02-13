import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import SideMenu from "./SideMenu";
import menu from "../images/menu.png";
import styled from "styled-components";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";

const LayoutStyle = styled.div`
  padding-top: 60px;
  .bar {
    height: 2px;
    background-color: black;
    margin-bottom: 0.5rem;
    transition: 0.5s ease;
    opacity: 1;
  }

  .open {
    .bar {
      background-color: white;
    }
    .bar:first-of-type {
      transform: rotate(45deg);
      transform-origin: left;
    }

    .bar:nth-of-type(2) {
      opacity: 0;
    }

    .bar:last-of-type {
      transform: rotate(-45deg);
      transform-origin: left;
    }
  }

  .menu-btn {
    top: 0;
    position: absolute;
    padding: 0.5rem;
    width: 45px;
    cursor: pointer;
    z-index: 30;
  }

  /* .menu-hamburger-img {
    width: 50px;
    height: 50px;
  }
  .menu-img:active {
    background-color: pink;
  }
  .menu-img:hover {
    background-color: pink;
  } */
`;

export default function Layout() {
  const [menuCollapse, setMenuCollapse] = useState(false);

  return (
    <LayoutStyle>
      <div
        className={`${menuCollapse ? "open" : " "}  menu-btn`}
        //className="menu-btn"
        onClick={() => {
          setMenuCollapse(!menuCollapse);
        }}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <SideMenu
        showMenu={menuCollapse}
        onClose={() => setMenuCollapse(!menuCollapse)}
      />
      {/* <button type="button" onClick={() => console.log("aaa")}>
        Menu */}
      {
        // <img
        //   className="menu-hamburger-img"
        //   src={menu}
        //   alt="Menu button"
        //   onClick={() => setMenuCollapse(!menuCollapse)}
        // ></img>
      }
      {/* </button> */}
      <Dashboard></Dashboard>
    </LayoutStyle>
  );
}
