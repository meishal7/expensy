import styled from "styled-components";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const EditModalStyle = styled.div`
  border: 1px solid black;
  position: absolute;
  background: pink;
`;

const PasswEditModal = ({ onSave, onCancel }) => {
  const [passw, setPassw] = useState("********");
  const userId = localStorage.getItem("userId");

  return (
    <EditModalStyle>
      {ReactDOM.createPortal(
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSave(userId, passw);
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
              minlength="8"
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
