import React from "react";
import { signIn } from "../firebase/authentication.js";

export default function Login() {
  return <div className="loginpage">
            <h1>TODO</h1>
            <button onClick={signIn}>Sign In With Google</button>
         </div>
}
