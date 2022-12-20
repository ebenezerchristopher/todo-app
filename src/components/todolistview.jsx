import React, { useContext } from "react";
import { UserContext } from "./usercontext.jsx";
import Todoitem from "./todoitem.jsx";

export default function TodoList() {
  let context = useContext(UserContext);
  let activeList = context.user.active;
  let todosList = activeList ? activeList.todos : null;

  return (
    <div>
      {todosList
        ? todosList.map((todo) => {
            return (
              <Todoitem
                key={todo.id}
                todoitem={todo}
                user={context.user.currentUser}
                setContext={context.setUser}
              />
            );
          })
        : ""}
    </div>
  );
}
