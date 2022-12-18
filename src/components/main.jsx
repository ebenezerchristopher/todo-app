import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./usercontext.jsx";
import { getLists, getStarredTodos } from "../firebase/database.js";
import Signout from "./signout.jsx";
import Header from "./header.jsx";
import Todolist from "./todolistview.jsx";
import Createlist from "./createlistview.jsx";
import Starredlist from "./starredview.jsx";
import CompletedTodos from "./completedview.jsx";
import Newtodobutton from "./newtodobutton.jsx";
import Newtodomodal from "./newtodomodal.jsx";
import { createPortal } from "react-dom";

export default function Main() {
  console.log("main called");
  let node = document.getElementById("modal");
  let context = useContext(UserContext);
  let user = context.user.currentUser;
  let setContext = context.setUser;

  let [newTodoState, setNewTodoState] = useState(false);
  let [starredView, setStarredView] = useState(false);
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

  return (
    <div>
      <Signout />
      <Header
        starredview={starredView}
        setstarredview={setStarredView}
        listmodal={setModal}
      />
      {starredView ? <Starredlist /> : <Todolist />}
      {!starredView ? <CompletedTodos /> : ""}
      <Newtodobutton onClick={setNewTodoState} />
      {createPortal(
        <Newtodomodal modalstate={newTodoState} onClick={setNewTodoState} />,
        node
      )}
      {createPortal(
        <Createlist
          modalstate={modal}
          onClick={setModal}
          user={user}
          setContext={setContext}
        />,
        node
      )}
    </div>
  );
}
