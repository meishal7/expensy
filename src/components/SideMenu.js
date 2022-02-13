import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import { ReactComponent as Logo } from "../images/logo.svg";
import close from "../images/close.png";
import { ReactComponent as CloseIcon } from "../images/close-icon.svg";

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
    padding-left: 1em;
  }
  .header {
    display: flex;
    justify-content: space-between;
  }
  .close-icon {
    width: 30px;
    height: 30px;
  }
  a {
    color: #fbf7ff;
    padding-top: 1em;
  }
`;
const IconWrapper = styled.div`
  svg {
    width: 100px;
  }
`;

export default function SideMenu({ onClose, showMenu }) {
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
          <div className="close-icon">
            {/* <CloseIcon onClick={onClose} /> */}
            <img
              className="close-icon"
              src={close}
              alt="Close button"
              onClick={onClose}
            ></img>
          </div>
        </div>
        <div>
          <Link to="/dashboard/account">Account</Link>

          <Link to="/dashboard">Expenses</Link>

          <button onClick={authCtx.logout}>Log Out</button>
        </div>
      </div>
    </SideMenuStyle>
  );
}
