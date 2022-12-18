import React from "react";

export default function Newtodobutton({ onClick }) {

  function modalToggler() {
    onClick(true);
  }
  return (
    <div onClick={modalToggler} className="newtodo">
      +
    </div>
  );
}
