import React, { useContext } from "react";
import Login from "./login.jsx";
import Getstarted from "./GetStarted.jsx";
import { UserContext } from "./usercontext.jsx";
import Main from "./main.jsx";

import Newtodomodal from "./newtodomodal.jsx";

export default function PassThrough() {
  let user = useContext(UserContext);

  if (!user.user.loggedin) {
     return <Newtodomodal modalstate={true} />
   //  return <Login />;
    // return <Main />;
  }
  if (user.user.loggedin && user.user.newuser) {
    return <Getstarted />;
  }

  if (user.user.loggedin) {
    return <Main />;
  }
}
