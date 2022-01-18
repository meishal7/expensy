import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  console.log("provider rerender");
  const [token, setToken] = useState(null);

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
  };

  const contextValue = {
    token: token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
/**
 * take a token and store it
 * if user created account, redirect to welcome page again and ask for sign in
 * when user clicked sign in, we store token with setToken() in ctx
 * when user clicked log out, we set token to null in ctx
 * create ctx property "isAuthenticated" and store false or true depending on token
 */
