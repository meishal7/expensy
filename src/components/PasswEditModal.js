import styled from "styled-components";
import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../context/AuthContext";
import CredentialsContext from "../context/CredentialsContext";

const EditModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  align-items: center;
  margin: 2em auto auto auto;
  padding-top: 1em;
  padding-bottom: 1em;
  width: 90%;
  border-radius: 5px;
  background-color: #fbf7ff;
  label {
    display: block;
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
  input {
    background: #fbf7ff;
    min-width: 300px;
    border-radius: 5px;
    min-height: 40px;
    border: 2px solid #eceaea;
    background-color: #e6e3e8;
  }
  input:focus {
    border: 2px solid #b5afaf;
  }
  .form-buttons {
    margin-top: 1em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .form-buttons button {
    min-width: 100px;
    border-radius: 2px;
    background-color: none;
    border: 2px solid #eceaea;
    color: black;
    min-height: 30px;
    box-shadow: 2px 2px 5px #bdb7b7;
  }
  .form-buttons button:hover {
    background-color: #a976f7;
  }
  .form-buttons button:active {
    background-color: #a976f7;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .submit-btn {
    margin-left: 1em;
    background-color: none;
  }
`;

const PasswEditModal = ({ onSave, onCancel }) => {
  const [passw, setPassw] = useState("********");
  const userId = localStorage.getItem("userId");
  const authCtx = useContext(AuthContext);
  const credCtx = useContext(CredentialsContext);

  const API_KEY = process.env.REACT_APP_API_KEY;

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <EditModalStyle>
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
            <div className="form-buttons">
              <button type="button" onClick={() => onCancel(false)}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Save
              </button>
            </div>
          </form>
        </EditModalStyle>,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default PasswEditModal;
