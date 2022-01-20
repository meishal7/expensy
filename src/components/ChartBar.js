import React from "react";

const ChartBar = ({ amount = 0, maxBudget }) => {
  const percent = Math.floor((amount / maxBudget) * 100);

  return (
    <React.Fragment>
      <div
        style={{
          border: "rgb(166, 144, 247) 1px solid",

          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flex: "1",
        }}
      >
        <div
          style={{ background: "rgb(166, 144, 247)", flex: `0 1 ${percent}%` }}
        ></div>
      </div>
    </React.Fragment>
  );
};
export default ChartBar;
