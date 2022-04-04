import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";


let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
  userId: "",
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
  const storedUserId = localStorage.getItem("userId");
  const remainingTime = calculateRemainingTime(ctoredExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.clear();
    return null;
  }
  return {
    token: storedToken,
    remainingTime: remainingTime,
    userId: storedUserId,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let userIdData;
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
    userIdData = tokenData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setId] = useState(userIdData);
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
    userId: userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
