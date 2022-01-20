import styled from "styled-components";
import React from "react";
import ReactDOM from "react-dom";

const ErrorModaleStyle = styled.div`
  border: 1px solid black;
  position: absolute;
  background: pink;
`;

const ErrorModaleOverlay = (props) => {
  return (
    <ErrorModaleStyle>
      <header>{props.title}</header>
      <p>{props.message}</p>
      <button type="button" onClick={props.onClose}>
        Close
      </button>
    </ErrorModaleStyle>
  );
};
const ErrorModale = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ErrorModaleOverlay
          title={props.title}
          message={props.message}
          onClose={props.onClose}
        />,
        document.getElementById("error-modale")
      )}
    </React.Fragment>
  );
};
export default ErrorModale;
