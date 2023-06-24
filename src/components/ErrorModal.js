import styled from "styled-components";
import React from "react";
import ReactDOM from "react-dom";

const ErrorModalStyle = styled.div`
  border: 1px solid black;
  position: absolute;
  background: pink;
`;

const ErrorModaleOverlay = (props) => {
  return (
    <ErrorModalStyle>
      <header>{props.title}</header>
      <p>{props.message}</p>
      <button type="button" onClick={props.onClose}>
        Close
      </button>
    </ErrorModalStyle>
  );
};
const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ErrorModaleOverlay
          title={props.title}
          message={props.message}
          onClose={props.onClose}
        />,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};
export default ErrorModal;
