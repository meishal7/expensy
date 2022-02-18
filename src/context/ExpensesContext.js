import React, { useState } from "react";
import BudgetContext from "./BudgetContext";

const ExpensesContext = React.createContext({
  expenses: [],
  expId: "",
  delete: (expId) => {},
  getExp: (userId) => {},
  storeNewExp: (expenseData, userId) => {},
  editExp: (expdata) => {},
  // editingExp: false,
  // setEditing: (editingExp) => {},
});

//const userId = localStorage.getItem("userId");

const editExp = async (userId, expData, token) => {
  try {
    const response = await fetch(
      // `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/expenses/${expData.id}.json`,
      `https://expancy-f5b7d-default-rtdb.firebaseio.com/users/${userId}/expenses/${expData.id}.json?auth=${token}`,
      {
        method: "PATCH",
        body: JSON.stringify(expData),

        // headers: {
        //   "Content-type": "application/json",
        // },
      }
    );
    // if (response.status >= 400 && response.status < 600) {
    //   throw new Error("Bad response from server");
    // }
    if (!response.ok) console.log(response.status);

    return response;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
};

const deleteExp = async (userId, expId, token) => {
  try {
    const response = await fetch(
      // `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/expenses/${expId}.json`,
      `https://expancy-f5b7d-default-rtdb.firebaseio.com/users/${userId}/expenses/${expId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    // if (response.status >= 400 && response.status < 600) {
    //   throw new Error("Bad response from server");
    // }
    if (!response.ok) console.log(response.status);

    console.log("res from deleting", response);
    return response;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
};

const getExp = async (userId, token) => {
  try {
    const response = await fetch(
      //`https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/expenses.json`,
      `https://expancy-f5b7d-default-rtdb.firebaseio.com/users/${userId}/expenses.json?auth=${token}`,
      {
        method: "GET",
      }
    );
    if (response.status >= 400 && response.status < 600) {
      throw new Error("Bad response from server");
    }

    const expenses = (await response.json()) || {};
    const data = Object.keys(expenses)?.map((id) => ({
      ...expenses[id],
      id,
    }));
    return data;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
};

const storeNewExp = async (userId, expenseData, token) => {
  try {
    const response = await fetch(
      // `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/expenses.json`,
      `https://expancy-f5b7d-default-rtdb.firebaseio.com/users/${userId}/expenses.json?auth=${token}`,

      {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) console.log(response.status);
    // if (response.status >= 400 && response.status < 600) {
    //   throw new Error("Bad response from server");
    // }
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
};

export const ExpensesContextProvider = (props) => {
  const [expId, setExpId] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [editingExp, setEditing] = useState(false);
  const budgCtx = useState(BudgetContext);

  const deleteExpHandler = async (userId, expId, token) => {
    setLoading(true);
    const res = await deleteExp(userId, expId, token);
    const expenses = await getExp(userId, token);
    setExpenses((prevExpenses) => expenses);
    setLoading(false);
  };

  const getExpHandler = async (userId, token) => {
    setLoading(true);
    const expenses = await getExp(userId, token);
    setExpenses((prevExpenses) => expenses);
    setLoading(false);
  };

  const storeNewExpHandler = async (userId, expData, token) => {
    setLoading(true);

    const res = await storeNewExp(userId, expData, token);
    const expenses = await getExp(userId, token);
    setExpenses((prevExpenses) => expenses);
    setLoading(false);
    console.log("res from store new exp", res);
  };

  const editExpHandler = async (userId, expdata, token) => {
    setLoading(true);

    const res = await editExp(userId, expdata, token);
    const expenses = await getExp(userId, token);
    setExpenses((prevExpenses) => expenses);
    setLoading(false);
  };

  const expContextValue = {
    expenses: expenses,
    expId: expId,
    delete: deleteExpHandler,
    getExp: getExpHandler,
    storeNewExp: storeNewExpHandler,
    editExp: editExpHandler,
  };

  return (
    <ExpensesContext.Provider value={expContextValue}>
      {props.children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
