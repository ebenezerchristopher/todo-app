import React, { useState, useEffect, createContext } from "react";
import { initFirebaseAuth } from "../firebase/authentication.js";

let UserContext = createContext();

let Provider = ({ children }) => {
  let [user, setUser] = useState(false);
  let observer = (userObj) => {
    
    if (userObj) {
console.log(userObj.uid)
      setUser(true);
    } else {
      setUser(false);
    }
  };

  useEffect(() => {
    
    initFirebaseAuth(observer);
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, Provider };
