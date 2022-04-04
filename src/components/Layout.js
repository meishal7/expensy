import Dashboard from "./Dashboard";
import SideMenu from "./SideMenu";
import styled from "styled-components";
import { useState } from "react";


const LayoutStyle = styled.div`
  background: #fbf7ff 0% 0% no-repeat padding-box;
  padding-top: 60px;
  .bar {
    height: 2px;
    background-color: black;
    margin-bottom: 0.5rem;
    transition: 0.5s ease;
    opacity: 1;
  }
  .open {
    margin-left: 1em;
    margin-top: 1em;
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
    margin-top: 1em;
    margin-left: 1em;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    padding: 0 0 0 0;

    .bar {
      display: none;
    }
  }
`;

export default function Layout() {
  const [menuCollapse, setMenuCollapse] = useState(false);

  return (
    <LayoutStyle>
      <div
        className={`${menuCollapse ? "open" : " "}  menu-btn`}
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
        onClick={() => setMenuCollapse(!menuCollapse)}
      />

      <Dashboard></Dashboard>
    </LayoutStyle>
  );
}
