import styled from "styled-components";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const EditModalStyle = styled.div`
  border: 1px solid black;
  position: absolute;
  background: pink;
`;

const EmailEditModal = ({ defEmail }) => {
  const [email, setEmail] = useState(defEmail);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <EditModalStyle>
      {ReactDOM.createPortal(
        <div>
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=""
              value={email}
              onChange={emailHandler}
            />

            <button type="button" onClick={() => {}}>
              Save
            </button>
            <button type="button" onClick={() => {}}>
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
