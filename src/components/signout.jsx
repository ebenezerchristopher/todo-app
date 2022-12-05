import React from "react";
import {signOutUser} from "../firebase/authentication.js";

export default function Signout () {
  return      <button className="signout" onClick={signOutUser} >Sign Out</button>
}