import React, { useContext, useState } from "react";
import ExpEditModal from "./ExpEditModal";
import AuthContext from "../context/AuthContext";
import { BiTrashAlt } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import styled from "styled-components";

const ExpenseStyle = styled.div`
  display: grid;
  grid-template-columns: 50% 30% 20%;
  grid-template-rows: auto;
  grid-template-areas:
    "name cost edit-btn"
    "date cost delete-btn";
  background: #efebf2 0% 0% no-repeat padding-box;
  margin: 1em auto;
  border-radius: 5px;
  width: 90%;
  padding: 15px 10px;
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
  .exp-item-name,
  .exp-item-name-div {
    display: none;
  }
  .title,
  .cost {
    font-size: 25px;
    margin: 0 0 0 0;
    color: #3f3d40;
  }
  .cost {
    padding-right: 10px;
  }
  .date {
    padding: 0 0 0 0;
    padding-top: 10px;
    margin: 0 0 0 0;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 25% 23% 21% 21% 5% 5%;
    grid-template-rows: auto;
    grid-template-areas: "name category date cost edit-btn delete-btn";
    width: 100%;
    margin: 1em auto;

    .exp-item-name,
    .exp-item-name-div {
      display: inline-block;
      margin: 0 0 0 0;
      padding: 0 0 0 0;
      color: #342680;
    }
    .title,
    .date,
    .cost,
    .category {
      font-size: 20px;
      margin: 0 0 0 0;
      color: #3f3d40;
    }
    .edit-btn {
      grid-area: edit-btn;
    }
    .delete-btn {
      grid-area: delete-btn;
    }
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
      <div className="exp-category-div exp-item-name-div">
        <p className="exp-item-name">Category</p>
        <p className="category">{category}</p>
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
