import styled from "styled-components";
import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../context/AuthContext";
import CredentialsContext from "../context/CredentialsContext";

const EditModalStyle = styled.div`
  border: 1px solid black;
  position: absolute;
  background: pink;
`;

const PasswEditModal = ({ onSave, onCancel }) => {
  const [passw, setPassw] = useState("********");
  const userId = localStorage.getItem("userId");
  const authCtx = useContext(AuthContext);
  const credCtx = useContext(CredentialsContext);

  const API_KEY = process.env.REACT_APP_API_KEY;

  return (
    <EditModalStyle>
      {ReactDOM.createPortal(
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const newData = {
                idToken: authCtx.token,
                password: passw,
                returnSecureToken: true,
              };

              credCtx.changeCredential(newData, API_KEY);
              onCancel(false);
            }}
          >
            <label htmlFor="Password(6 characters minimum):">
              Password(6 characters minimum)
            </label>
            <input
              type="password"
              id="pass"
              name="password"
              minLength="8"
              required
              value={passw}
              onChange={(event) => setPassw(event.target.value)}
            />

            <button type="submit">Save</button>
            <button type="button" onClick={() => onCancel(false)}>
              Cancel
            </button>
          </form>
        </div>,
        document.getElementById("edit-passw-modal-root")
      )}
    </EditModalStyle>
  );
};

export default PasswEditModal;
