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
  const storedId = localStorage.getItem("userId");
  const remainingTime = calculateRemainingTime(ctoredExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.clear();
    return null;
  }
  return {
    token: storedToken,
    remainingTime: remainingTime,
    id: storedId,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let idData;
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
    idData = tokenData.id;
  }

  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState(idData);
  const navigate = useNavigate();

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.clear();
    navigate("/log-in", { replace: true });
    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const loginHandler = (token, expirationTime, userId, email) => {
    setToken(token);
    setId(userId);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("email", email);
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
    id: id,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
