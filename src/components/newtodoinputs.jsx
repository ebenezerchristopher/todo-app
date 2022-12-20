import React, { useState, useContext } from "react";
import Starred from "./starred.jsx";
import Calendar from "./calendarsvg.jsx";
import { UserContext } from "./usercontext.jsx";
import { getLists, addToDo } from "../firebase/database.js";
import { v4 as uuidv4 } from "uuid";
import createTodo from "../functions/createtodo.js";

export default function Newtodoinputs({onClick}) {
  let context = useContext(UserContext);
  let user = context.user.currentUser;
  let setContext = context.setUser;

  let [dateView, setDateView] = useState(false);

  function submitHandler(event) {
    event.preventDefault();
    let listId = context.user.active.id;
    let todoId = uuidv4();
    let completed = false;
    let starred = event.target.checkbox.checked;
    let title = event.target.title.value;
    let details = event.target.details.value;
    let date = event.target.date.value;

    let todo = createTodo(title, details, date, starred, completed, todoId, listId);

    addToDo(user, todo).then((resolve) => {
      async function fetchData() {
        let data = await getLists(user);
        let id = todo.listid;
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
    onClick(false)
  }

  function calendarHandler(event) {
    event.stopPropagation();
    let click = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    let node = document.querySelector("[type='date']");
    node.dispatchEvent(click);
  }

  function enableButton() {
    let input = document.querySelector("[name='title']");
    let button = document.querySelector("[type='submit']");
    let valid = input.validity.valid;
    if (valid) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "");
    }
  }

  function dateHandler(event) {
    let value = event.target.value;
    if (value) {
      setDateView(true);
      let dateview = document.querySelector(".dateview>p");

      if (dateview) {
        dateview.textContent = value;
      }
    }
  }

  function starHandler(event) {
    event.stopPropagation();
    document.querySelector(".inputsvg").classList.toggle("starred");
    let click = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    let node = document.querySelector("[type='checkbox']");
    node.dispatchEvent(click);
  }

  return (
    <div className="newtodoinputs">
      <form
        onClick={(event) => {
          event.stopPropagation();
        }}
        onSubmit={submitHandler}
        noValidate
      >
        <input
          onChange={enableButton}
          type="text"
          name="title"
          placeholder="New task"
          required
        />
        <input type="text" name="details" placeholder="Add details" />
        {dateView ? (
          <div className="dateview">
            <p></p>
          </div>
        ) : null}
        <div className="icons">
          <div className="calendar">
            <input onChange={dateHandler} type="date" name="date" />
            <div>
              <Calendar onClick={calendarHandler} />
            </div>
          </div>

          <div className="checkbox">
            <input type="checkbox" name="checkbox" />
            <div>
              <Starred onClick={starHandler} svg="inputsvg" />
            </div>
          </div>

          <button type="submit" disabled>
            save
          </button>
        </div>
      </form>
    </div>
  );
}
