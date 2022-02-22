import React from "react";
import styled from "styled-components";

const ChartBarStyle = styled.div`
  /* .outer-candle {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;
    border-radius: 5px;
    background: #e1dce6;
    width: 10px;
    border: rgb(166, 144, 247) 1px solid;
  } */
`;

const ChartBar = ({ amount = 0, maxBudget }) => {
  //console.log({ amount, maxBudget });
  const percent = Math.floor((amount / parseInt(maxBudget)) * 100);
  //console.log(percent);
  return (
    <React.Fragment>
      <div
        className="outer-candle"
        style={{
          border: "rgb(166, 144, 247) 1px solid",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flex: "1",
          borderRadius: "5px",
          background: "#efebf2",
          maxWidth: "40px",
        }}
      >
        <div
          style={{
            background: "var(--color-primary)",
            flex: `0 1 ${percent}%`,
            borderRadius: "5px",
          }}
        ></div>
      </div>
    </React.Fragment>
  );
};
export default ChartBar;
