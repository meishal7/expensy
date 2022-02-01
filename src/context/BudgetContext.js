import React, { useState } from "react";

const BudgetContext = React.createContext({
  budget: 0,
  storeBudget: (budget) => {},
  getBudget: (userId) => {},
  editBudget: (userId, budget) => {},
});

const editBudget = async (userId, budget) => {
  const budgData = { budget: budget };
  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/budget/.json`,
      {
        method: "PATCH",
        body: JSON.stringify(budgData),

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
  let budget = 0;
  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/budget.json`,
      {
        method: "GET",
      }
    );
    if (response.status >= 400 && response.status < 600) {
      throw new Error("Bad response from server");
    }

    const data = (await response.json()) || {};

    if (
      data &&
      Object.keys(data).length === 0 &&
      Object.getPrototypeOf(data) === Object.prototype
    ) {
      budget = 5000;
      return budget;
    }

    return ({ budget } = data);
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
};

const storeBudget = async (userId, budget) => {
  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/budget.json`,

      {
        method: "POST",
        body: JSON.stringify(budget),
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
  const [budget, setBudget] = useState(5000);

  const getBudgetHandler = async (userId) => {
    const budget = await getBudget(userId);
    setBudget(budget);
    console.log(budget);
    //localStorage.setItem("budget", budget);
  };

  const editBudgetHandler = async (userId, budget) => {
    await editBudget(userId, budget);
    const newBudget = await getBudget(userId);
    setBudget(newBudget);
    //localStorage.setItem("budget", newBudget);
  };

  const budgetContextValue = {
    budget: budget,
    storeBudget: storeBudget,
    getBudget: getBudgetHandler,
    editBudget: editBudgetHandler,
  };

  return (
    <BudgetContext.Provider value={budgetContextValue}>
      {props.children}
    </BudgetContext.Provider>
  );
};

export default BudgetContext;
