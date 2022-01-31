import React, { useContext } from "react";
import ExpensesContext from "../context/ExpensesContext";
import Expense from "./Expense";

const Expenses = (props) => {
  const expCtx = useContext(ExpensesContext);
  // const [editingExp, setEditing] = useState(false);
  // const [expChangeData, setExpChangeData] = useState();
  // const [expId, setExpId] = useState("");

  const deleteHandler = (id) => {
    expCtx.delete(id);
  };

  // const editHandler = (expData) => {
  //   console.log(expData);
  //   setEditing(true);
  //   setExpId(expData.id);
  //   setExpChangeData({ title: expData.title, cost: expData.cost });
  // };

  // const saveChangesHandler = (expId, changedData) => {
  //   //console.log(JSON.stringify(expChangeData));
  //   expCtx.editExp(expId, changedData);
  // };

  return (
    <React.Fragment>
      {props.expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        props.expenses.map((expense) => (
          <Expense
            onDelete={deleteHandler}
            //onEdit={editHandler}
            key={expense.id}
            title={expense.title}
            cost={expense.cost}
            month={expense.month}
            day={expense.day}
            year={expense.year}
            id={expense.id}
          />
        ))
      )}
      {/* {editingExp && (
        <EditModal
          title={expChangeData.title}
          cost={expChangeData.cost}
          id={expChangeData.id}
          cancelEditing={setEditing}
          saveChanges={saveChangesHandler}
        />
      )} */}
    </React.Fragment>
  );
};
export default Expenses;
//onSave={editHandler}
