import ChartBar from "./ChartBar";
import styled from "styled-components";
import BudgetContext from "../context/BudgetContext";
import { useContext } from "react";

const ChartStyle = styled.div`
  display: flex;
  justify-content: center;
  overflow: scroll;
  min-height: 300px;
  gap: 0 10px;
  .candle {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .month-name {
    text-align: left;
    padding-left: 0.3em;
  }
  .hr-bottom,
  .hr-top,
  .hr-label-bottom,
  .hr-label-top {
    display: none;
  }
  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto;

    .hr-bottom {
      border-top: 1px solid #efebf2;
      width: 68%;
      padding-right: 2em;
      position: absolute;
      opacity: 0.3;
      top: 18em;
      display: inline;
    }
    .hr-top {
      border-top: 0.5px solid #efebf2;
      width: 70%;
      position: absolute;
      top: 12em;
      opacity: 0.3;
      text-align: center;
      display: inline;
    }
    .hr-label-bottom {
      margin-top: 14em;
      margin-right: 67em;
      position: absolute;
      display: inline;
    }
    .hr-label-top {
      position: absolute;
      margin-right: 67em;
      top: 12em;
      display: inline;
      
    }
  }
`;
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const Chart = ({ expenses }) => {
  const budgCtx = useContext(BudgetContext);

  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] = +obj.cost + acc[key];
      return acc;
    }, {});
  }

  let groupedExpenses = groupBy(expenses, "month");
  

  return (
    <ChartStyle>
      {monthNames.map((month, i) => (
        <div className="candle" key={i}>
          <p className="month-name">{month}</p>
          <ChartBar
            amount={groupedExpenses[monthNames[i]]}
            maxBudget={budgCtx.budget}
          />
        </div>
      ))}
    </ChartStyle>
  );
};
export default Chart;
