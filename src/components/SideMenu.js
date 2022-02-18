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
  height: 100vh;
  .content {
    margin-left: 1em;
    margin-top: 4em;
  }
  .header {
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
  .links {
    margin-top: 1em;
  }
  .logout-btn {
    margin-top: 1em;
    max-width: 130px;
    background-color: #3f3d40;
    border: #a976f7 solid 1px;
    border-radius: 2px;
    color: #fbf7ff;
    padding: 5px 5px;
    font: normal normal 600 20px/31px "Open Sans";
  }
`;
const IconWrapper = styled.div`
  svg {
    width: 180px;
    margin-top: 1em;
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
