import React, { useContext } from "react";
import Login from "./login.jsx";
import Getstarted from "./GetStarted.jsx";
import { UserContext } from "./usercontext.jsx";

export default function PassThrough() {
  let user = useContext(UserContext);

  if (!user) {
    return <Login />;
  }
  if (user) {
    return <Getstarted />;
  }
}
