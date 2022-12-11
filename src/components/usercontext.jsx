import React, { createContext } from "react";


let UserContext = createContext();

let Provider = ({ context, children }) => {
  
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export { UserContext, Provider };
