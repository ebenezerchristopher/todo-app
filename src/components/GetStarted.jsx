import React, { useEffect, useContext } from "react";
import getstarted from "../getstarted.jpg";
import Signout from "./signout.jsx";
import { UserContext } from "./usercontext.jsx";
import {
  addUser,
  userExists,
  getLists,
  addList,
  addToDo,
} from "../firebase/database.js";
import { v4 as uuidv4 } from "uuid";
import createTodo from "../functions/createtodo.js";

let Getstarted = () => {
  let context = useContext(UserContext);
  let setUser = context.setUser;
  let user = context.user.currentUser;

  let navigate = () => {
    setUser((prev) => {
      return {
        ...prev,
        newuser: false,
      };
    });
  };

  useEffect(() => {
    function initialize() {
      addUser(user);

      let listId = uuidv4();
      let todoId = uuidv4();
      let listName = "My Tasks";
      let todoTitle = "Sample Todo";
      let todoDetail = "Getting a coffee tomorrow afternoon";
      let todoDate = "2022";
      let starred = false;
      let completed = false;

      addList(user, listId, listName);

      let todo = createTodo(
        todoTitle,
        todoDetail,
        todoDate,
        starred,
        completed,
        todoId,
        listId
      );

      addToDo(user, todo);
    }

    initialize();
  }, []);

  return (
    <div className="getstartedpage">
      <Signout />
      <img src={getstarted} alt="" />
      <button className="getstartedbutton" onClick={navigate}>
        Lets Get Started
      </button>
    </div>
  );
};

export default Getstarted;
