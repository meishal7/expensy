import ChartBar from "./ChartBar";
import styled from "styled-components";

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
  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] = acc[key] + obj.cost;
      return acc;
    }, {});
  }

  let groupedExpenses = groupBy(expenses, "month");

  return (
    <ChartStyle>
      {monthNames.map((month, i) => (
        <div className="candle" key={i}>
          <p>{month}</p>
          <ChartBar amount={groupedExpenses[i + 1]} maxBudget={10000} />
        </div>
      ))}
    </ChartStyle>
  );
};
export default Chart;
