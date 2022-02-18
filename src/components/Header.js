import { Fragment, useContext } from "react";
import BudgetContext from "../context/BudgetContext";
import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.div`
  width: 100vw;
  text-align: left;
  p {
    font-size: 20px;
    padding-left: 1em;
  }
  span {
    font-weight: bold;
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
