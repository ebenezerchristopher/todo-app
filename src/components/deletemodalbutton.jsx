import React from "react";

export default function Deletemodalbutton({ onClick }) {
  function modalToggler() {
    onClick(true);
  }
  return (
    <div onClick={modalToggler} className="deletemodalbutton">
<svg width="21px" height="21px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><circle cx="10.5" cy="10.5" r="1"/><circle cx="10.5" cy="5.5" r="1"/><circle cx="10.5" cy="15.5" r="1"/></g></svg>
    </div>
  );
}
