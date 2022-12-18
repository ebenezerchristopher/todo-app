import React, { useState } from "react";
import Starred from "./starred.jsx";
import { updateTodos, getLists } from "../firebase/database.js";

export default function Todoitem({ todoitem, user, setContext }) {
  console.log("todoitem called");
  let starred = todoitem.starred;
  let completed = todoitem.completed;

  let [starredState, setStarred] = useState(starred);

  let [completedState, setCompleted] = useState(completed);

  function starredHandler() {
    updateTodos(user, todoitem, {
      starred: !starredState,
    }).then((resolve) => {
      setStarred((prev) => !prev);

      async function fetchData() {
        let data = await getLists(user);
        let id = todoitem.listid;
        let activeList = data.filter((e) => e.id === id)[0];
        setContext((prev) => {
          return {
            ...prev,
            lists: data,
            active: activeList, 
          };
        });
      }
      fetchData();
    });
  }

  async function completedHandler() {
    updateTodos(user, todoitem, {
      completed: !completedState,
    }).then((resolve) => {
      setCompleted((prev) => !prev);
      async function getData() {
        let data = await getLists(user);
        let id = todoitem.listid;
        let activeList = data.filter((e) => e.id === id)[0];
        setContext((prev) => {
          return {
            ...prev,
            lists: data,
            active: activeList,
          };
        });
      }
      getData();
    });
  }

  return (
    <div key={todoitem.id} className="todoitem" data-id={todoitem.id}>
      <div
        onClick={completedHandler}
        className={completedState ? "uncompleted completed" : "uncompleted"}
      ></div>
      <div className="title">{todoitem.title}</div>
      <div className="detail">{todoitem.detail}</div>
      <div className="date">
        <div>{todoitem.date}</div>
      </div>
      <Starred
        onClick={starredHandler}
        className="star"
        svg={starredState ? "starred" : ""}
      />
    </div>
  );
}
