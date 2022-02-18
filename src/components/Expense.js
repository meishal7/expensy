import React, { useContext, useState } from "react";
import ExpEditModal from "./ExpEditModal";
import AuthContext from "../context/AuthContext";
import { BiTrashAlt } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import styled from "styled-components";

const ExpenseStyle = styled.div`
  display: grid;
  grid-template-columns: 60% 20% 20%;
  grid-template-rows: auto;
  grid-template-areas:
    "name cost edit-btn"
    "date cost delete-btn";

  padding: 0.5em 0.5em 0.5em 1.5em;

  background: #efebf2 0% 0% no-repeat padding-box;
  margin-top: 1em;
  margin-bottom: 1em;
  .exp-title-div {
    grid-area: name;
  }
  .exp-category-div {
    grid-area: category;
  }
  .date-div {
    grid-area: date;
  }
  .amount-div {
    grid-area: cost;
  }
  .edit-btn {
    grid-area: edit-btn;
    padding: 0 0;
    color: #342680;
  }
  .delete-btn {
    grid-area: delete-btn;
    padding: 0 0;
    color: #e34bb9;
  }
  .exp-item-name {
    display: none;
  }
  .title {
    font-size: 25px;
    margin: 0 0 0 0;
    color: #3f3d40;
  }
  .date {
    margin: 0 0 0 0;
    color: #3f3d40;
  }
  .cost {
    font-size: 20px;
    color: #3f3d40;
  }
`;
const IconWrapper = styled.div`
  svg {
    width: 25px;
    height: 25px;
  }
`;

const Expense = ({
  title,
  cost,
  category,
  date,
  month,
  year,
  id,
  onDelete,
}) => {
  const [editingExp, setEditing] = useState(false);

  // const token = localStorage.getItem("token");
  // const userId = localStorage.getItem("userId");

  const authCtx = useContext(AuthContext);

  return (
    <ExpenseStyle>
      <div className="exp-title-div">
        <p className="exp-item-name">Expense name</p>
        <p className="title">{title}</p>
      </div>
      <div className="exp-category-div exp-item-name">
        <p>Category</p>
        <p>{category}</p>
      </div>
      <div className="date-div">
        <p className="exp-item-name">Date</p>
        <p className="date">{date}</p>
        {/* <p>{month}</p>
        <p>{day}</p>
        <p>{year}</p> */}
      </div>
      <div className="amount-div">
        <p className="exp-item-name">Amount</p>
        <p className="cost">${cost}</p>
      </div>

      <button
        className="edit-btn"
        onClick={() => {
          setEditing(true);
        }}
      >
        {" "}
        <IconWrapper>
          <BsPencilSquare />
        </IconWrapper>
      </button>
      <button
        className="delete-btn"
        onClick={() => onDelete(authCtx.userId, id, authCtx.token)}
      >
        <IconWrapper>
          <BiTrashAlt />
        </IconWrapper>
      </button>

      {editingExp && (
        <ExpEditModal
          title={title}
          cost={cost}
          category={category}
          id={id}
          cancelEditing={setEditing}
        />
      )}
    </ExpenseStyle>
  );
};

export default Expense;
