import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import firebaseInit from "./firebase/initfirebase.js";


  firebaseInit();


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <App />

);
