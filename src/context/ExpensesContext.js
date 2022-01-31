import React from "react";
import { useState } from "react";

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

const userId = localStorage.getItem("userId");

const editExp = async (expData) => {
  console.log("exp data from exp is");

  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/expenses/${expData.id}.json`,
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

    console.log("res from editing", response);
    return response;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
};

const deleteExp = async (expId) => {
  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/expenses/${expId}.json`,
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

const getExp = async (userId) => {
  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/expenses.json`,
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

const storeNewExp = async (userId, expenseData) => {
  const storedBudget = localStorage.getItem("budget");
  if (storedBudget === 0) {
    throw new Error("You did not set up a monthly budget.");
  }
  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/expenses.json`,

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
  const [editingExp, setEditing] = useState(false);

  const deleteExpHandler = async (expId) => {
    setLoading(true);
    const res = await deleteExp(expId);
    const expenses = await getExp(userId);
    setExpenses((prevExpenses) => expenses);
    setLoading(false);
  };

  const getExpHandler = async (userId) => {
    setLoading(true);
    const expenses = await getExp(userId);
    setExpenses((prevExpenses) => expenses);
    setLoading(false);
  };

  const storeNewExpHandler = async (userId, expData) => {
    setLoading(true);
    const res = await storeNewExp(userId, expData);
    const expenses = await getExp(userId);
    setExpenses((prevExpenses) => expenses);
    setLoading(false);
    console.log("res from store new exp", res);
  };

  const editExpHandler = async (expdata) => {
    setLoading(true);

    const res = await editExp(expdata);
    const expenses = await getExp(userId);
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
    // editingExp: editingExp,
    // setEditing: setEditing,
  };

  return (
    <ExpensesContext.Provider value={expContextValue}>
      {props.children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
