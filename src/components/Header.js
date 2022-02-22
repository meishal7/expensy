import { Fragment, useContext } from "react";
import BudgetContext from "../context/BudgetContext";
import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.div`
  text-align: left;
  display: inline-block;
  margin-left: 1.5em;

  p {
    font-size: 20px;
  }
  span {
    font-weight: bold;
  }
  @media (min-width: 768px) {
    display: inline-block;
    margin-top: 1em;
    margin-left: 3em;
  }
`;

export default function Dashboard({ children }) {
  const budgCtx = useContext(BudgetContext);
  return (
    <HeaderStyle>
      <p>
        <span>Monthly Budget:</span> ${budgCtx.budget}{" "}
      </p>
    </HeaderStyle>
  );
}
