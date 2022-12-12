import React from "react";
import { addList, getLists } from "../firebase/database.js";
import { v4 as uuidv4 } from "uuid";

export default function Createlist({ modalstate, onClick, user, setContext }) {
  function modalToggler(event) {
    onClick(false);
  }

  function inputChange(event) {
    let button = document.querySelector("[type='submit']");
    let validity = event.target.validity.valid;

    if (validity) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "");
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    let inputValue = event.target.input.value;
    let listId = uuidv4();

    async function fetchData() {
      let data = await getLists(user);
      setContext((prev) => {
        return {
          ...prev,
          lists: data,
        };
      });
    }

    addList(user, listId, inputValue).then((resolve) => {
      fetchData();
    });
    
    onClick(false)
  }

  return modalstate ? (
    <div className="createlistmodal">
      <form onSubmit={submitHandler} novalidate>
        <div className="heading">
          <button onClick={modalToggler} type="button">
            x
          </button>
          <div className="title">Create new list</div>
          <button type="submit" disabled>
            Done
          </button>
        </div>
        <input onChange={inputChange} type="text" name="input" required></input>
      </form>
    </div>
  ) : null;
}
