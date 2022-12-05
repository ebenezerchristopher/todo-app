import React, { useEffect, useContext } from "react";
import getstarted from "../getstarted.jpg";
import Signout from "./signout.jsx";
import { UserContext } from "./usercontext.jsx";
import { addUser } from "../firebase/database.js";

let Getstarted = () => {
  let context = useContext(UserContext);
  let navigate = () => {
   let setUser = context.setUser
   
  setUser((prev) => {
      return {
       ...prev,
       newuser: false
      }
    })
  }
  let loggedUser = context.user.currentUser;
  useEffect(() => {
    addUser(loggedUser);
  }, []);
  return (
    <div className="getstartedpage">
      <Signout />
      <img src={getstarted} alt="" />
      <button className="getstartedbutton" onClick={navigate} >Lets Get Started</button>
    </div>
  );
};

export default Getstarted;
