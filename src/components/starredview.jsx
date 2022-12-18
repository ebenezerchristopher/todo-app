import React, { useContext } from "react";
import { UserContext } from "./usercontext.jsx";
import Starred from "./starred.jsx";
import Todoitem from "./todoitem.jsx";

export default function Starredlist() {
  let context = useContext(UserContext);
  let lists = context.user.lists;
  let starred = [];
  for (const list of lists) {
    starred = starred.concat(list.starredTodos)
  }
  return (
    <div>
      {starred ? (
        starred.map((todo) => {
          return (
            <Todoitem
              key={todo.id}
              todoitem={todo}
              user={context.user.currentUser}
              setContext={context.setUser}
            />
          );
        })
      ) : (
        <Starred className="starcontainer" />
      )}
    </div>
  );
}
