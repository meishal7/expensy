import React, { useState } from "react";

const BudgetContext = React.createContext({
  budget: 5000,
  storeBudget: (budget) => {},
  getBudget: (userId) => {},
  editBudget: (userId, budget) => {},
});

const editBudget = async (userId, budget) => {
  const budgData = { budget: budget };
  try {
    const response = await fetch(
      `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(budgData),

        headers: {
          "Content-type": "application/json",
        },
      }
    );
    // if (response.status >= 400 && response.status < 600) {
    //   throw new Error("Bad response from server");
    // }
    if (!response.ok) console.log(response.status);

    console.log("res from editing budg", response);
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
    //console.log(data);

    if (
      data &&
      Object.keys(data).length === 0 &&
      Object.getPrototypeOf(data) === Object.prototype
    ) {
      budget = 5000;
      return budget;
    }
    // returns int
    console.log("res from get budg", data);
    // const { budget } = data;
    // console.log(budget);
    return data;
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
        method: "PUT",
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
    console.log("res from store budg", res);
    return res;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
};

export const BudgetContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState(5000);

  const storeBudgetHandler = async (userId, budget) => {
    setLoading(true);
    await storeBudget(userId, budget);
    setBudget(budget);
    setLoading(false);
  };

  const getBudgetHandler = async (userId) => {
    setLoading(true);
    const budget = await getBudget(userId);
    //console.log(budget);
    setBudget(budget);
    setLoading(false);
  };

  const editBudgetHandler = async (userId, budget) => {
    setLoading(true);
    await editBudget(userId, budget);
    budget = await getBudget(userId);
    console.log(budget);
    setBudget(budget);
    setLoading(false);
  };

  const budgetContextValue = {
    budget: budget,
    storeBudget: storeBudgetHandler,
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
