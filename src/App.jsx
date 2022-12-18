import React, { useState, useEffect, createContext } from "react";
import "./index.scss";
import PassThrough from "./components/passthrough.jsx";
import { Provider } from "./components/usercontext.jsx";

import { initFirebaseAuth } from "./firebase/authentication.js";
import { userExists } from "./firebase/database.js";

let App = () => {
  let [user, setUser] = useState({
    loggedin: false,
    newuser: true,
    currentUser: null,
    lists: [],
    active: null, 
  });

  let observer = async (userObj) => {
    if (userObj) {
      let newUser = !(await userExists(userObj));

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

  return (
    <Provider context={{user, setUser}} >
      <PassThrough />
    </Provider>
  );
};

export default App;
