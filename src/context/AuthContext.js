import { getActiveElement } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = (props) => {
  const storedToken = localStorage.getItem("token");
  const ctoredExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(ctoredExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.clear();
    return null;
  }
  return {
    token: storedToken,
    remainingTime: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const navigate = useNavigate();

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.clear();
    navigate("/log-in", { replace: true });
    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData, logoutHandler]);

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
