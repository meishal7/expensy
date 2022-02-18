import React from "react";

const ChartBar = ({ amount = 0, maxBudget }) => {
  //console.log({ amount, maxBudget });
  const percent = Math.floor((amount / parseInt(maxBudget)) * 100);
  //console.log(percent);
  return (
    <React.Fragment>
      <div
        style={{
          border: "rgb(166, 144, 247) 1px solid",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flex: "1",
          borderRadius: "5px",
        }}
      >
        <div style={{ background: "#8840F5", flex: `0 1 ${percent}%` }}></div>
      </div>
    </React.Fragment>
  );
};
export default ChartBar;
