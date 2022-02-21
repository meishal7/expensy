import React from "react";
import styled from "styled-components";

const YearFilterDiv = styled.div`
  width: 50vw;
  margin: auto auto;
  margin-top: 2em;

  label {
    padding-right: 0.5em;
  }
  select {
    background: #fbf7ff;
    border-radius: 5px;
    border: 2px solid #eceaea;
    background-color: #e6e3e8;
  }
  @media (min-width: 768px) {
    position: absolute;
    left: 1200px;
    top: -15px;
  }
`;

/** 
 * position: absolute;
width: 100%;
height: 100%;
background-color: #0000007d;
z-index: 99;x 
 */

const YearFilter = ({ onChangeYear }) => {
  // const yearHandler = (event) => {
  //   //console.log(+event.target.value);
  //   onChangeYear(+event.target.value);
  // };

  return (
    <YearFilterDiv>
      <label>Filter by Year</label>
      <select
        onChange={(event) => {
          onChangeYear(+event.target.value);
        }}
      >
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
      </select>
    </YearFilterDiv>
  );
};
export default YearFilter;
