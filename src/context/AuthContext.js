import { getActiveElement } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
  id: "",
  storeId: (id) => {},
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
  const [id, setId] = useState("");
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

  const storeIdHandler = (id) => {
    setId(id);
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
    id: id,
    storeId: storeIdHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
