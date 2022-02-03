import React, { useState } from "react";

const initialEmail = localStorage.getItem("email");

const CredentialsContext = React.createContext({
  email: "",
  //password: "",
  changeCredential: (data, API_KEY) => {},
});

const changeCredential = async (data, API_KEY) => {
  // const newData = {
  //   idToken: token,
  //   email: newCredent,
  //   returnSecureToken: true,
  // };

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,

      {
        method: "POST",
        body: JSON.stringify(data),
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
    //console.log(res);
    return res;
  } catch (error) {
    console.log("Fetch error: ", error);
    alert(error);
  }
};

// const getBudget = async (userId) => {
//   let budget = 0;
//   try {
//     const response = await fetch(
//       `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/budget.json`,
//       {
//         method: "GET",
//       }
//     );
//     if (response.status >= 400 && response.status < 600) {
//       throw new Error("Bad response from server");
//     }

//     const data = (await response.json()) || {};
//     //console.log(data);

//     if (
//       data &&
//       Object.keys(data).length === 0 &&
//       Object.getPrototypeOf(data) === Object.prototype
//     ) {
//       budget = 5000;
//       return budget;
//     }
//     // const { pbudget } = data;
//     // console.log(pbudget);
//     return data.budget;
//   } catch (error) {
//     console.log("Fetch error: ", error);
//     alert(error);
//   }
// };

// const storeBudget = async (userId, budget) => {
//   try {
//     const response = await fetch(
//       `https://expensy-db-default-rtdb.firebaseio.com/users/${userId}/budget.json`,

//       {
//         method: "POST",
//         body: JSON.stringify(budget),
//         headers: {
//           "Content-type": "application/json",
//         },
//       }
//     );
//     if (!response.ok) console.log(response.status);
//     // if (response.status >= 400 && response.status < 600) {
//     //   throw new Error("Bad response from server");
//     // }
//     const res = await response.json();
//     return res;
//   } catch (error) {
//     console.log("Fetch error: ", error);
//     alert(error);
//   }
// };

export const CredentialsContextProvider = (props) => {
  //const storedEmail = localStorage.getItem("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  //const [password, setPass] = useState(password);

  const changeCredentialHandler = async (data, API_KEY) => {
    console.log("aaa");
    setLoading(true);
    const res = await changeCredential(data, API_KEY);

    localStorage.setItem("email", res.email);
    const newEmail = res.email;
    setEmail(newEmail);
    setLoading(false);
  };

  //   const getBudgetHandler = async (userId) => {
  //     const budget = await getBudget(userId);
  //     setBudget(budget);
  //     console.log(budget);
  //     //localStorage.setItem("budget", budget);
  //   };

  //   const editBudgetHandler = async (userId, budget) => {
  //     await editBudget(userId, budget);
  //     const newBudget = await getBudget(userId);
  //     setBudget(newBudget);
  //     //localStorage.setItem("budget", newBudget);
  //   };

  const credentContextValue = {
    email: email,
    //password: password,
    changeCredential: changeCredentialHandler,
  };

  return (
    <CredentialsContext.Provider value={credentContextValue}>
      {props.children}
    </CredentialsContext.Provider>
  );
};

export default CredentialsContext;
