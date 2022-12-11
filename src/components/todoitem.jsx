import React from "react";
import Starred from "./starred.jsx";

export default function Todoitem({ todoitem }) {
  return (
    <div className="todoitem" data-id={todoitem.id}>
      <div className="completed"></div>
      <div className="title" >{todoitem.title}</div>
      <div className="detail">{todoitem.detail}</div>
      <div className="date">
        <div>{todoitem.date}</div>
      </div>
      <Starred className="star" />
    </div>
  );
}
