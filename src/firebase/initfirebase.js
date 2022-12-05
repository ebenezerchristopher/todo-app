import { initializeApp } from "firebase/app";
import config from "./firebase-config.js";

export default function firebaseInit () {
   return initializeApp(config);
  
}