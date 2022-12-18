import React, { useContext } from "react";
import Starred from "./starred.jsx";
import { UserContext } from "./usercontext.jsx";

export default function Scrollheader({ lists, listmodal, setstarredview, starredview }) {
  let context = useContext(UserContext);
  let active = context.user.active;
  let setContext = context.setUser;

  function modalToggler(event) {
    listmodal(true);
  }

  function starredViewToggler(event) {
    setstarredview(true);
  }

  function clickHandler(event) {
    setstarredview(false);

    let id = event.target.dataset.id;
    let activeList = context.user.lists.filter((e) => e.id === id)[0];
    setContext((prev) => {
      return {
        ...prev,
        active: activeList,
      };
    });
  }
  return (
    <div className="scrollheader">
      <div className="scroller">
        <Starred onClick={starredViewToggler} className ={starredview ? "selected" : ""} svg="starred" />
        {lists.map((list) => {
          return (
            <div
              onClick={clickHandler}
              className={(active.id === list.id) && (!starredview)  ? "selected" : ""}
              data-id={list.id}
              key={list.id}
            >
              {list.title}
            </div>
          );
        })}
      </div>
      <div onClick={modalToggler} className="newlist">
        + Newlist
      </div>
    </div>
  );
}
