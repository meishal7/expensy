import React from "react";
import { useState } from "react";

const BudgetContext = React.createContext({
  budget: 0,
  storeDefaultBudget: (budget) => {},
});

const userId = localStorage.getItem("userId");

const editBudget = async (expData) => {
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

const getBudget = async (userId) => {
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

const storeBudget = async (userId, expenseData) => {
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

export const BudgetContextProvider = (props) => {
  const [budget, setBudget] = useState(0.0);

  const storeDefaultBudgetHandler = () => {
    const defBudg = 0;
    localStorage.setItem("budget", defBudg);
  };
  //   const [expenses, setExpenses] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [editingExp, setEditing] = useState(false);

  //   const deleteExpHandler = async (expId) => {
  //     setLoading(true);
  //     const res = await deleteExp(expId);
  //     const expenses = await getExp(userId);
  //     setExpenses((prevExpenses) => expenses);
  //     setLoading(false);
  //   };

  //   const getExpHandler = async (userId) => {
  //     setLoading(true);
  //     const expenses = await getExp(userId);
  //     setExpenses((prevExpenses) => expenses);
  //     setLoading(false);
  //   };

  //   const storeNewExpHandler = async (userId, expData) => {
  //     setLoading(true);
  //     const res = await storeNewExp(userId, expData);
  //     const expenses = await getExp(userId);
  //     setExpenses((prevExpenses) => expenses);
  //     setLoading(false);
  //     console.log("res from store new exp", res);
  //   };

  //   const editExpHandler = async (expdata) => {
  //     setLoading(true);

  //     const res = await editExp(expdata);
  //     const expenses = await getExp(userId);
  //     setExpenses((prevExpenses) => expenses);
  //     setLoading(false);
  //   };

  const budgetContextValue = {
    budget: budget,
    storeDefaultBudget: storeDefaultBudgetHandler,
    // expenses: expenses,
    // expId: expId,
    // delete: deleteExpHandler,
    // getExp: getExpHandler,
    // storeNewExp: storeNewExpHandler,
    // editExp: editExpHandler,
    // editingExp: editingExp,
    // setEditing: setEditing,
  };

  return (
    <BudgetContext.Provider value={budgetContextValue}>
      {props.children}
    </BudgetContext.Provider>
  );
};

export default BudgetContext;
