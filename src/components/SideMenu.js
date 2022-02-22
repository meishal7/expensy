import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import { ReactComponent as Logo } from "../images/logo.svg";
import { VscAccount } from "react-icons/vsc";
import { BsCart } from "react-icons/bs";

const SideMenuStyle = styled.div`
  background: #3f3d40 0% 0% no-repeat padding-box;
  width: 250px;
  top: 0;
  position: absolute;
  z-index: 1;
  left: ${({ showMenu }) => (showMenu ? "0px" : "-250px")};
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  height: 100%;
  .content {
    margin-left: 1.5em;
    margin-top: 4em;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
  }
  .close-icon {
    width: 30px;
    height: 30px;
  }
  a {
    color: #fbf7ff;

    text-decoration: none;
    font: normal normal 400 23px/31px "Open Sans";
    padding-left: 10px;
  }
  /* a:before {
    transition: all 0.3s ease-in-out 0s;
    transform: scaleX(0);
  } */
  /* a:hover {
    color: rgba(169, 118, 247, 1);
  } */

  a {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(169, 118, 247, 1);
      transform: scaleX(0);
      transform-origin: bottom left;
      transition: transform 0.3s;
    }
    &:hover::after {
      transform: scaleX(1);
    }
  }
  .links {
    margin-top: 1em;
  }
  .logout-btn {
    margin-top: 1em;
    width: 180px;
    background-color: #3f3d40;
    border: var(--color-primary) solid 1px;
    border-radius: 2px;
    color: #fbf7ff;
    padding: 5px 5px;
    font: normal normal 600 20px/31px "Open Sans";
  }
  .logout-btn:hover {
    cursor: pointer;

    /* -webkit-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
    -moz-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
    -ms-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
    -o-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
    transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
    color: rgba(255, 255, 255, 0.85); */
    box-shadow: rgba(169, 118, 247, 1) 0 80px 0px 2px inset;
  }
  @media (min-width: 768px) {
    position: fixed;
    left: 0;
    min-width: 250px;
    height: 100%;
    .content {
      margin-left: 1.5em;
      margin-top: 0.5em;
    }
  }
`;
const IconWrapper = styled.div`
  svg {
    width: 180px;
  }
`;

export default function SideMenu({
  onClose,
  showMenu,
  onClick,
  setMenuCollapse,
  menuCollapse,
}) {
  const authCtx = useContext(AuthContext);
  return (
    <SideMenuStyle showMenu={showMenu}>
      <div className="content">
        <div className="header">
          {/* <div className="logo"> */}
          <IconWrapper>
            <Logo />
          </IconWrapper>
          {/* </div> */}
        </div>
        <div className="menu-items">
          <div className="links">
            <VscAccount color="#fbf7ff" fontSize="20px" />
            <Link to="/dashboard/account" onClick={onClick}>
              Account
            </Link>
          </div>
          <div className="links">
            <BsCart color="#fbf7ff" fontSize="20px" />
            <Link to="/dashboard" onClick={onClick}>
              Expenses
            </Link>
          </div>

          <button className="logout-btn" onClick={authCtx.logout}>
            Log Out
          </button>
        </div>
      </div>
    </SideMenuStyle>
  );
}
