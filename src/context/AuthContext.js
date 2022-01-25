import { getActiveElement } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import getExpenses from "../modules/getExpenses";

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
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.clear();
    navigate("/log-in", { replace: true });
    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const loginHandler = (token, expirationTime, userId) => {
    setToken(token);
    setId(userId);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  // const storeIdHandler = (userId) => {
  //   setId(userId);
  // };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData, logoutHandler]);

  useEffect(() => {
    if (token) {
      const data = getExpenses(id);
      setData(data);
    }
  }, [token, id]);

  const contextValue = {
    token: token,
    login: loginHandler,
    logout: logoutHandler,
    id: id,
    //storeId: storeIdHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
