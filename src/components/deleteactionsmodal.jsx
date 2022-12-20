import React, { useContext, useEffect} from "react";
import { UserContext } from "./usercontext.jsx";
import { getLists, deleteTodo, deleteList } from "../firebase/database.js";

export default function Deleteactions({ modalstate, onClick }) {
  let context = useContext(UserContext);
  let activeList = context.user.active;
  let user = context.user.currentUser;
  let setContext = context.setUser;
  let completedTodos = activeList ? activeList.completedTodos : [];

  useEffect(() => {
    if (completedTodos.length < 1) {
    let button = document.querySelector("button.deletetodos");
    if (button) {
    button.setAttribute("disabled", "");
    } 
  } else {
    let button = document.querySelector("button.deletetodos");
    if (button) {
    button.removeAttribute("disabled");
    } 
  } 
  })

  function removeList() {
    deleteList(user, activeList.id, completedTodos).then((resolve) => {
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
    });

    onClick(false);
  }

  function removeTodos() {
    console.log("removeTodos called")
    let promises = []
    
    for (let todo of completedTodos) {
      let promise = deleteTodo(user, todo)
      promises.push(promise)
    }
    
      Promise.all(promises).then((resolve ) => {
      async function fetchData() {
        let data = await getLists(user);
        let id = activeList.id ;
        let currentList = data.filter((e) => e.id === id)[0];
        setContext((prev) => {
          return {
            ...prev,
            lists: data,
            active: currentList, 
          };
        });
      }
      fetchData();
    })
    
    onClick(false);
  }

  function modalToggler() {
    onClick(false);
  }
  return modalstate ? (
    <div onClick={modalToggler} className="deleteactionsmodal">
      <div onClick={(event) => {}} className="deleteactions">
        <button onClick={removeList} type="button" >
          delete list
        </button>
        <button
          className="deletetodos"
          onClick={removeTodos}
          type="button"
           >
          delete completed todos
        </button>
      </div>
    </div>
  ) : null;
}
