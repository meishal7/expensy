import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const DashboardStyle = styled.div`
  @media (min-width: 768px) {
    width: 80%;
    margin-left: 250px;
  }
`;

export default function Dashboard({ children }) {
  return (
    <DashboardStyle>
      {}
      <Outlet />
    </DashboardStyle>
  );
}
