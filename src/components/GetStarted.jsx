import React from "react";
import getstarted from "../getstarted.jpg";
import Signout from "./signout.jsx";

let Getstarted = () => {
  return (
    <div className="getstartedpage">
      <Signout />
      <img src={getstarted} alt="" />
      <button className="getstartedbutton">Lets Get Started</button>
    </div>
  );
};

export default Getstarted;
