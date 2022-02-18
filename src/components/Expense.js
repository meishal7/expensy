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
    "category date delete-btn";
  padding-left: 0.5em;
  padding-right: 0.5em;
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
  }
  .delete-btn {
    grid-area: delete-btn;
  }
  .exp-item-name {
    display: none;
  }
  .title {
    font-size: 25px;
  }
`;

const Expense = ({ title, cost, category, month, day, year, id, onDelete }) => {
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
      <div className="exp-category-div">
        <p>Category</p>
        <p>{category}</p>
      </div>
      <div className="date-div">
        <p className="exp-item-name">Date</p>
        <p>{month}</p>
        <p>{day}</p>
        <p>{year}</p>
      </div>
      <div className="amount-div">
        <p className="exp-item-name">Amount</p>
        <p>${cost}</p>
      </div>

      <button
        className="edit-btn"
        onClick={() => {
          setEditing(true);
        }}
      >
        <BsPencilSquare />
      </button>
      <button
        className="delete-btn"
        onClick={() => onDelete(authCtx.userId, id, authCtx.token)}
      >
        <BiTrashAlt />
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
