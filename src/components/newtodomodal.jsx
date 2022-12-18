import React from "react";
import Newtodoinputs from "./newtodoinputs.jsx";
export default function Newtodomodal({ modalstate, onClick }) {
  function modalToggler() {
    onClick(false);
  }
  return modalstate ? (
    <div onClick={modalToggler} className="newtodomodal">
    <Newtodoinputs />
    </div>
  ) : null;
}
