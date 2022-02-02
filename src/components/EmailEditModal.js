import styled from "styled-components";
import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../context/AuthContext";
import key from "../modules/keys";
import CredentialsContext from "../context/CredentialsContext";

const EditModalStyle = styled.div`
  border: 1px solid black;
  position: absolute;
  background: pink;
`;

const EmailEditModal = ({ email: defemail, onCancel }) => {
  const authCtx = useContext(AuthContext);
  const credentCtx = useContext(CredentialsContext);
  const [email, setEmail] = useState(defemail);

  const API_KEY = key();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <EditModalStyle>
      {ReactDOM.createPortal(
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const newData = {
                idToken: authCtx.token,
                email: email,
                returnSecureToken: true,
              };
              credentCtx.changeCredential(newData, API_KEY);
              
            }}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=""
              value={email}
              onChange={emailHandler}
            />

            <button type="submit">Submit</button>
            <button type="button" onClick={() => onCancel(false)}>
              Cancel
            </button>
          </form>
        </div>,
        document.getElementById("edit-email-modal-root")
      )}
    </EditModalStyle>
  );
};

export default EmailEditModal;
