import ChartBar from "./ChartBar";
import styled from "styled-components";
import BudgetContext from "../context/BudgetContext";
import { useContext } from "react";

const ChartStyle = styled.div`
  display: flex;
  min-height: 300px;
  gap: 0 10px;
  .candle {
    display: flex;
    flex-direction: column;
    flex: 1;
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
  //console.log(groupedExpenses);

  return (
    <ChartStyle>
      {monthNames.map((month, i) => (
        <div className="candle" key={i}>
          <p>{month}</p>
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
