import React, { useContext } from "react";
import { UserContext } from "./usercontext.jsx";
import Scrollheader from "./scrollheader.jsx";

export default function Header({ setstarredview, listmodal, starredview}) {
  let context = useContext(UserContext);
  let data = context.user.lists;
  return (
    <div className="header">
      <div className="heading">TASKS</div>
      <Scrollheader starredview={starredview} setstarredview={setstarredview} lists={data} listmodal={listmodal} />
    </div>
  );
}
