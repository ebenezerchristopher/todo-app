import React, { useState, useEffect, createContext } from "react";
import { initFirebaseAuth } from "../firebase/authentication.js";
import { userExists } from "../firebase/database.js";

let UserContext = createContext();

let Provider = ({ children }) => {
  let [user, setUser] = useState({
    loggedin: false,
    newuser: true,
    currentUser: null,
  });
  let observer = async (userObj) => {
    if (userObj) {
      let newUser = !await userExists(userObj);
      console.log(newUser);
      setUser((prev) => {
        return {
          ...prev,
          loggedin: true,
          newuser: newUser,
          currentUser: userObj,
        };
      });
    } else {
      setUser((prev) => {
        return {
          ...prev,
          loggedin: false,
        };
      });
    }
  };

  useEffect(() => {
    initFirebaseAuth(observer);
  }, []);

  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
};

export { UserContext, Provider };
