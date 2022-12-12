import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./usercontext.jsx";
import { getLists } from "../firebase/database.js";
import Signout from "./signout.jsx";
import Header from "./header.jsx";
import Todolist from "./todolistview.jsx";
import Createlist from "./createlistview.jsx";
import { createPortal } from "react-dom";

export default function Main() {
  let node = document.getElementById("modal");
  let context = useContext(UserContext);
  let user = context.user.currentUser;
  let setContext = context.setUser;

  let [modal, setModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let data = await getLists(user);
      setContext((prev) => {
        return {
          ...prev,
          lists: data,
          active: data[0],
        };
      });
    }
    fetchData();
  }, []);

  //<Signout />
  //<Header />

  return (
    <div>
      <Signout />
      <Header listmodal={setModal} />
      <Todolist />
      {createPortal(
        <Createlist modalstate={modal} onClick={setModal} user={user} setContext={setContext} />,
        node
      )}
    </div>
  );
}
