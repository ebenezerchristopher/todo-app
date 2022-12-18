import React, { useState } from "react";
import Starred from "./starred.jsx";
import Calendar from "./calendarsvg.jsx";

export default function Newtodoinputs() {
  let [dateView, setDateView] = useState(false);

  function submitHandler(event) {
    event.preventDefault();
    let value = event.target.checkbox.checked;
    console.log(value);
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
    let value = event.target.value
    if (value ) {
      setDateView(true)
    let dateview = document.querySelector(".dateview>p")
    
    if (dateview) {
      dateview.textContent = value
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
