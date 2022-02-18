import React from "react";
import styled from "styled-components";

// const ChartBarStyle = styled.div`
//   border: "rgb(166, 144, 247) 1px solid";
//   display: "flex";
//   flex-direction: "column";
//   justify-content: "flex-end";
//   flex: "1";
//   border-radius: "5px";
// `;

const ChartBar = ({ amount = 0, maxBudget }) => {
  //console.log({ amount, maxBudget });
  const percent = Math.floor((amount / parseInt(maxBudget)) * 100);
  //console.log(percent);
  return (
    <React.Fragment>
      <div
        style={{
          // border: "rgb(166, 144, 247) 1px solid",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flex: "1",
          borderRadius: "5px",
          background: "#E1DCE6",
          minWidth: "10px",
        }}
      >
        <div
          style={{
            background: "#8840F5",
            flex: `0 1 ${percent}%`,
            borderRadius: "5px",
          }}
        ></div>
      </div>
    </React.Fragment>
  );
};
export default ChartBar;
