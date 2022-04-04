import React from "react";

const ChartBar = ({ amount = 0, maxBudget }) => {
 
  const percent = Math.floor((amount / parseInt(maxBudget)) * 100);
  
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
