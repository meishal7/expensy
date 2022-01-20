import React from "react";
const YearFilter = ({ onChangeYear }) => {
  const yearHandler = (event) => {
    console.log(+event.target.value);
    onChangeYear(+event.target.value);
  };

  return (
    <React.Fragment>
      <label>Filter by Year</label>
      <select onChange={yearHandler}>
        <option value="2021">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
      </select>
    </React.Fragment>
  );
};
export default YearFilter;
