import React, { useState } from "react";

const initialEmail = localStorage.getItem("email");

const CredentialsContext = React.createContext({
  email: initialEmail,
  password: "********",
  changeCredential: (data, API_KEY) => {},
});

const changeCredential = async (data, API_KEY) => {
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

    const res = await response.json();

    return res;
  } catch (error) {
    alert(error);
  }
};

export const CredentialsContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(initialEmail);

  const changeCredentialHandler = async (data, API_KEY) => {
    setLoading(true);
    const res = await changeCredential(data, API_KEY);
    localStorage.setItem("email", res.email);
    const newEmail = res.email;
    setEmail(newEmail);
    setLoading(false);
  };

  const credentContextValue = {
    email: email,
    password: "********",
    changeCredential: changeCredentialHandler,
  };

  return (
    <CredentialsContext.Provider value={credentContextValue}>
      {props.children}
    </CredentialsContext.Provider>
  );
};

export default CredentialsContext;
