import React, { useContext, useState } from "react";
import { UserContext } from "./usercontext.jsx";

import Todoitem from "./todoitem.jsx";

export default function CompletedTodos() {
  console.log("cpage called");
  let context = useContext(UserContext);
  let list = context.user.active;
  let completed = list ? list.completedTodos : [];
  let headText = `Completed(${completed.length})`;

  let [show, setShow] = useState(false);

  function todoToggler(event) {
    setShow((prev) => {
      return !prev;
    });
  }

  return completed.length > 0 ? (
    <div className="completedtodos">
      <div className="header">
        <div className="text">
          <h1>{headText} </h1>
        </div>
        <div
          onClick={todoToggler}
          className={show ? "claret claretrotate" : "claret"}
        >
          ^
        </div>
      </div>
      <div>
        {show
          ? completed.map((todo) => {
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
    </div>
  ) : (
    ""
  );
}
