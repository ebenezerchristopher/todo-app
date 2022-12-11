import React, { useContext } from "react";
import { UserContext } from "./usercontext.jsx";
import Scrollheader from "./scrollheader.jsx";

export default function Header() {
  let context = useContext(UserContext);
  let data = context.user.lists;
  return (
    <div className="header">
      <div className="heading">TASKS</div>
      <Scrollheader lists={data} />
    </div>
  );
}
